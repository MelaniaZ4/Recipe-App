import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
recipes: Recipe[] = [
  new Recipe('Tofu Scramble', 'Yummy vegan scrambled Eggs', 'https://simpleveganblog.com/wp-content/uploads/2019/04/Simple-tofu-scramble-6.jpg')
];
  constructor() { }

  ngOnInit(): void {
  }

}
