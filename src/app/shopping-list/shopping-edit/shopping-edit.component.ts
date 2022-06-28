import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  // editedItemIndex: number; //This is managed in the store
  editedItem: Ingredient;
  // @ViewChild('nameInput') nameInputRef: ElementRef; //pass name of local reference #nameInput through ViewChild
  // @ViewChild('amountInput') amountInputRef: ElementRef; //pass name of local reference #namountInput through ViewChild
 // @Output() ingredientAdded = new EventEmitter<Ingredient>(); //pass Ingredient data through event
  // Other option: IngredientAdded = new EventEmitter<{name: string, amount: number}>();

  constructor(
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    //use store instead of shoppinglist service
    //this.subscription = manage subscription in THIS component rather than through the SL service as done before
    this.subscription = this.store.select('shoppingList').subscribe(stateData => { //we receive statedata through the subscription (observable)
      if (stateData.editedIngredientIndex > -1) {
        this.editMode =  true;
        this.editedItem = stateData.editedIngredient;
        // this.editedItemIndex = stateData.editedIngredientIndex;
        this.slForm.setValue({
          amount:this.editedItem.amount,
          name: this.editedItem.name
        })
      } else {
        this.editMode = false;
      }
    }
      )
    // this.subscription = this.shoppinglistService.startedEditing
    // .subscribe(
    //   (index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedItem = this.shoppinglistService.getIngredient(index);
    //     this.slForm.setValue({
    //       amount:this.editedItem.amount,
    //       name: this.editedItem.name
    //     })
    //   }
    // );
  }

  onSubmitItem (form: NgForm) {
    const value = form.value;
    // const ingName = this.nameInputRef.nativeElement.value; //create const for name using inout value
    // const ingAmount = this.amountInputRef.nativeElement.value; //create const for amount using inout value
    const newIngredient = new Ingredient(value.name, value.amount); //pass constant data to create new ingredient
    if (this.editMode) {
      // this.shoppinglistService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      // this.shoppinglistService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
    //this.ingredientAdded.emit(newIngredient); //emit custom event and pass new ingredient as data
  }

  onClear () { //cancel editing Mode
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit()); //reach out to store and create new StopEdit action from SL Action.
    //No payload(passing data in brackets) required
  }

  onDelete() {
    // this.shoppinglistService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit()); //avoid strange behaviour on next visit
  }
}
