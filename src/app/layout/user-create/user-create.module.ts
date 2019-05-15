import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCreateRoutingModule } from './user-create-routing.module';
import { UserCreateComponent } from './user-create.component';
import { MatButtonModule, MatInputModule, MatFormFieldModule , MatCardModule,
  MatIconModule, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PushNotificationsService } from '../../common/services/notification.service';

@NgModule({
  declarations: [UserCreateComponent],
  imports: [
    CommonModule,
    UserCreateRoutingModule,
    MatButtonModule, MatInputModule, MatFormFieldModule , MatCardModule, MatIconModule, MatSnackBarModule ,
    FlexLayoutModule,
    FormsModule, ReactiveFormsModule
  ],
  providers : [PushNotificationsService]
})
export class UserCreateModule { }
