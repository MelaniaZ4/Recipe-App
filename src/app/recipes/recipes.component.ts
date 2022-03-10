import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected
    .subscribe(       // subscribe to event listener in recipeService
      (recipe: Recipe) => {   // argument list (recipe) and ES6 Arrow function
        this.selectedRecipe = recipe; // selectedrecipe property set to equal the recipe we got with the event
      }
    );
  }
  

}
