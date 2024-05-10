import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AccountComponent } from './account.component';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule // Include FormsModule
  ],
  exports: [
    AccountComponent
  ]
})
export class AccountModule { }
