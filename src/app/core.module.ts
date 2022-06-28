import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipeService } from './recipes/recipes.service';
import { ShoppingListService } from './shopping-list/shoppinglist.service';
import { NgModule } from "@angular/core";

@NgModule({
  providers: [
      ShoppingListService,
      RecipeService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
      }
  ]
})

export class CoreModule {}
