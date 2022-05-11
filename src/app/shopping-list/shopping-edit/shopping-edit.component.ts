import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist.service';

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

  constructor(private shoppinglistService: ShoppingListService) { }

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

  onAddItem (form: NgForm) {
    const value = form.value;
    // const ingName = this.nameInputRef.nativeElement.value; //create const for name using inout value
    // const ingAmount = this.amountInputRef.nativeElement.value; //create const for amount using inout value
    const newIngredient = new Ingredient(value.name, value.amount); //pass constant data to create new ingredient
    if (this.editMode) {
      this.shoppinglistService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppinglistService.addIngredient(newIngredient);
    }
    //this.ingredientAdded.emit(newIngredient); //emit custom event and pass new ingredient as data
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
