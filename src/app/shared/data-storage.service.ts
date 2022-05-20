import { RecipeService } from './../recipes/recipes.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-recipe-app-ed60b-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }
}
