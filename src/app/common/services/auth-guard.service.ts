import { Injectable } from '@angular/core';

import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}
    canActivate(): any {
        if (localStorage.getItem('pocLoggedUser')) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
