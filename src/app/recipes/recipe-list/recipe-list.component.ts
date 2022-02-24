import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>(); //pass <Recipe Type
  recipes: Recipe[] = [
  new Recipe('Tofu Scramble', 'Vegan Scrambled Eggs', 'https://simpleveganblog.com/wp-content/uploads/2019/04/Simple-tofu-scramble-6.jpg'),
  new Recipe('Tofu Burger', 'Burger with Tofu Pattie', 'https://pinchofyum.com/wp-content/uploads/Tofu-Burgers-1-2-960x1440.jpg')

];
  constructor() { }

  ngOnInit(): void {
  }
  
  onRecipeSelected(recipe: Recipe){ // Receive selected recipe of type Recipe
    this.recipeWasSelected.emit(recipe); //pass recipe as data 
  }
}
