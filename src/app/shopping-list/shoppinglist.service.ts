import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppinglistService {
    ingredientsChanged = new EventEmitter<Ingredient[]>(); //passes on array of ingredients to inform other components
    private ingredients: Ingredient[] = [
    new Ingredient ('Apples' , 5),
    new Ingredient ('Tomatoes', 10),  
    ];

    getIngredients() {
        return this.ingredients.slice(); //access copy of ingredients list
        this.ingredientsChanged.emit(this.ingredients.slice()); //emiting the event ingredientsChanged
    }
    addIngredient (ingredient: Ingredient) {//Method from shoppinglist component
        this.ingredients.push(ingredient);
    }

    addIngredients (ingredients: Ingredient[]) {
        // for (let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }  // viable option but might cause issues with too many ingredients
        this.ingredients.push(...ingredients); //spread ES6 element ... it spread array into list of single ingredients
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

}