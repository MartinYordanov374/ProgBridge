import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(private router: Router ){}
  canActivate(): boolean {
    if (localStorage.getItem('user')) 
    {
      // this.router.navigate([ '/' ]);
      return true; 
    }
    this.router.navigate([ '/' ]);
    return false

  }

  

  
}
