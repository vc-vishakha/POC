import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from "./login.component";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCheckboxModule, MatInputModule ,MatFormFieldModule , MatSnackBarModule } from '@angular/material';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false }),
    MatButtonModule, MatCheckboxModule, MatInputModule,MatFormFieldModule,MatSnackBarModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class LoginModule { }
