import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @ViewChild('nameInput') nameInputRef: ElementRef; //pass name of local reference #nameInput through ViewChild
  // @ViewChild('amountInput') amountInputRef: ElementRef; //pass name of local reference #namountInput through ViewChild
 // @Output() ingredientAdded = new EventEmitter<Ingredient>(); //pass Ingredient data through event
  // Other option: IngredientAdded = new EventEmitter<{name: string, amount: number}>();

  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem (form: NgForm) {
    const value = form.value;
    // const ingName = this.nameInputRef.nativeElement.value; //create const for name using inout value
    // const ingAmount = this.amountInputRef.nativeElement.value; //create const for amount using inout value
    const newIngredient = new Ingredient(value.name, value.amount); //pass constant data to create new ingredient
    //this.ingredientAdded.emit(newIngredient); //emit custom event and pass new ingredient as data
    this.shoppinglistService.addIngredient(newIngredient);
  }

}
