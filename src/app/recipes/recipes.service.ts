import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shoppinglist.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
  new Recipe(
    'Tofu Scramble',
    'Vegan Scrambled Eggs',
    'https://simpleveganblog.com/wp-content/uploads/2019/04/Simple-tofu-scramble-6.jpg',
    [
        new Ingredient('Tofu', 1),
        new Ingredient('Onion', 1),
        new Ingredient('Mushroom', 4),
        new Ingredient('Almond Butter', 1),
        new Ingredient('Tomato', 1)
    ]),
  new Recipe(
    'Tofu Burger',
    'Burger with Tofu Pattie',
    'https://pinchofyum.com/wp-content/uploads/Tofu-Burgers-1-2-960x1440.jpg',
    [
        new Ingredient('Tofu', 1),
        new Ingredient('onion', 1),
        new Ingredient('Garlic', 1),
        new Ingredient('Carrot', 1)
    ])

];

constructor(private shoppingListService: ShoppingListService){}

getRecipes(){
    return this.recipes.slice();  //.slice returns a copy of the recipes array rather than the actual array
}

getRecipe(id: number) {
    return this.recipes[id];
}

addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
}
}
