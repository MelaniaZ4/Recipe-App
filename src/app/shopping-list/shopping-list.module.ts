import { LoggingService } from './../logging.service';
import { RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
  ShoppingListComponent,
  ShoppingEditComponent,
  ],
  imports: [
    RouterModule.forChild([
         { path: '', component: ShoppingListComponent }
    ]),
    FormsModule,
    SharedModule
  ],
  exports: [RouterModule]
})

export class ShoppingListModule {}
