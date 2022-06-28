import { LoggingService } from './../logging.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Observable<{ ingredients: Ingredient[] }>; //uninitialised property set by shoppinglist service
    private subscription: Subscription;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscription = this.shoppingListService.ingredientsChanged
    // .subscribe(
    //   (ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients;
    //   }
    //   );

    this.loggingService.printLog('Hello from ShoppingListComponent NgOnInit');

  }

  onEditItem(index: number) {
    //instead of using the shoppinglist service....
    // this.shoppingListService.startedEditing.next(index);

    //...we are now using the store and dispatch a new action from SL Actions
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    // access all actions through store, create(dispatch) new action based on
    //start edit class which takes the index as an argument

  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
    }

}
