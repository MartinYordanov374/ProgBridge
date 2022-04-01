import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router){}

  canActivate(): boolean {
    if (localStorage.getItem('user')) {
        // this.router.navigate([ '/' ]);
	      return true; 
    }
    
    // this.authService.setRedirectUrl(url);
    this.router.navigate([ '/register' ]);
    return false;		
  }
  
}
