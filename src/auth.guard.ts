import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, UrlTree, Router,Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){}

  canActivate(): boolean {
    if (!localStorage.getItem('user')) {
        // this.router.navigate([ '/' ]);
	      return true; 
    }
    
    // this.authService.setRedirectUrl(url);
    this.router.navigate([ '/' ]);
    return false;		
  }
}
  

