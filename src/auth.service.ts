import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { map, filter } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  data: any = ''
  registerURL = 'http://localhost:3000/register'
  secondURL = 'https://reqres.in/api/users'
  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: any)
  {
    let username = user.username.value
    let pass = user.password.value
    let repass = user.repass.value

    return this.http.post<any>(this.registerURL, {username, pass, repass})
                     
    

    if( this.data ) {
      this.router.navigate(['/'])
      
    }
    else
    {
      this.router.navigate(['/register'])
    }
  }
}
