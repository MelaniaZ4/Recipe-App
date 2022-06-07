import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: AuthComponent}
    ])
  ],
  exports: [RouterModule]
})

export class AuthModule {}
