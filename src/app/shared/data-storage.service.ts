import { RecipeService } from './../recipes/recipes.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-recipe-app-ed60b-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http
    .get<Recipe[]>(
      'https://ng-recipe-app-ed60b-default-rtdb.firebaseio.com/recipes.json'
    )
    .pipe(
      map(recipes => { // RXJS Operator
        return recipes.map(recipe => { // JS Array Method
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
          }; // '...' = spread operator used to copy all properties/data of 'Recipe'
       });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    )
  }
}
