import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';

import { MatButtonModule, MatInputModule, MatFormFieldModule, MatTooltipModule, MatCardModule, MatIconModule,
  MatTableModule , MatPaginatorModule , MatSortModule, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FileTypPipe } from '../../common/pipes';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserListComponent, FileTypPipe],
  imports: [
    CommonModule,
    UserListRoutingModule,
    MatButtonModule, MatInputModule, MatFormFieldModule, MatTooltipModule, MatCardModule, MatIconModule,
    MatTableModule , MatPaginatorModule , MatSortModule, MatSnackBarModule ,
    FlexLayoutModule,
    FormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UserListModule { }
