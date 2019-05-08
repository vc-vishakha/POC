import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import {RegisterComponent  } from "./register.component";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCheckboxModule, MatInputModule ,MatFormFieldModule ,MatSnackBarModule} from '@angular/material';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false }),
    MatButtonModule, MatCheckboxModule, MatInputModule,MatFormFieldModule,
    FormsModule, ReactiveFormsModule ,MatSnackBarModule
  ]
})
export class RegisterModule { }
