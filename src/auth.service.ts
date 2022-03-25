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
    // let username = user.username.value
    // let pass = user.password.value
    // let repass = user.repass.value
    let username = user[0].value;
    let pass = user[1].value
    let repass = user[2].value

    let userData = this.http.post<any>('http://localhost:3000/register', {username, pass, repass}).subscribe(
      (res) => { 
        this.data = res
        if( this.data ) {
          localStorage.setItem('user', this.data)
          this.router.navigate(['/'])
          
        }
        else
        {
          this.router.navigate(['/register'])
        }
      },
      (error) => { console.log(error);

    })
  }
  

  logoutUser()
  {
    localStorage.clear()
    this.router.navigate(['/'])
    
  }
}
