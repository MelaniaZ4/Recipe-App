import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from './shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Ingredient[]; //uninitialised property set by shoppinglist service
    private igChangeSub: Subscription;

  constructor(private shoppinglistService: ShoppinglistService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppinglistService.getIngredients();
    this.igChangeSub = this.shoppinglistService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
      this.ingredients = this.ingredients;
      }
      );
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

}
