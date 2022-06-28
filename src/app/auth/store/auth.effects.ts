import { HttpClient } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import * as AuthActions from './auth.actions';
import { environment } from '../../../environments/environment';
import { of } from "rxjs";
import { Injectable } from "@angular/core";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START), //filtering for specific action
    switchMap((authData: AuthActions.LoginStart) => {
       return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
        environment.firebaseAPIKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      )
      .pipe(
         map(resData => {
          const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        return of(new AuthActions.Login({
          email: resData.email,
          userId: resData.localId,
          token: resData.idToken,
          expirationDate: expirationDate
        })
        );
      }),
        catchError(error => {
          return of(); // of() creates a new observable
        }),
      );
    }),

  );

  constructor(
    private actions$: Actions,
    private http: HttpClient) {}
}
