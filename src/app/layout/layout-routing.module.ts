import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component : LayoutComponent,
    children : [
      {
        path : 'users',
        loadChildren : './user-list/user-list.module#UserListModule'
      },
      {
        path : 'adduser',
        loadChildren : './user-create/user-create.module#UserCreateModule'
      },
      {
        path : ':id/user',
        loadChildren : './user-create/user-create.module#UserCreateModule'
      },
      {
        path : '' , redirectTo : 'users' , pathMatch : 'full'
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
