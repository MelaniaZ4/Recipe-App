import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes =[
    { path: '', component: AppComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: 'shopping-list', component: ShoppingListComponent }
  
];

@NgModule({
   imports: [
    RouterModule.forRoot(appRoutes)
 ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}