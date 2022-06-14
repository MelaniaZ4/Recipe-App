import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  // @ViewChild('nameInput') nameInputRef: ElementRef; //pass name of local reference #nameInput through ViewChild
  // @ViewChild('amountInput') amountInputRef: ElementRef; //pass name of local reference #namountInput through ViewChild
 // @Output() ingredientAdded = new EventEmitter<Ingredient>(); //pass Ingredient data through event
  // Other option: IngredientAdded = new EventEmitter<{name: string, amount: number}>();

  constructor(
    private shoppinglistService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {

    this.subscription = this.shoppinglistService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppinglistService.getIngredient(index);
        this.slForm.setValue({
          amount:this.editedItem.amount,
          name: this.editedItem.name
        })
      }
    );
  }

  onSubmitItem (form: NgForm) {
    const value = form.value;
    // const ingName = this.nameInputRef.nativeElement.value; //create const for name using inout value
    // const ingAmount = this.amountInputRef.nativeElement.value; //create const for amount using inout value
    const newIngredient = new Ingredient(value.name, value.amount); //pass constant data to create new ingredient
    if (this.editMode) {
      // this.shoppinglistService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({
        index: this.editedItemIndex,
        ingredient: newIngredient}));
    } else {
      // this.shoppinglistService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
    //this.ingredientAdded.emit(newIngredient); //emit custom event and pass new ingredient as data
  }

  onClear () {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    // this.shoppinglistService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
