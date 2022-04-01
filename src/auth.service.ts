import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { map, filter } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  data: any = ''
  registerURL = 'http://localhost:3000/register'
  secondURL = 'https://reqres.in/api/users'
  public loginError: any = '';
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
          localStorage.setItem('user', JSON.stringify([this.data]))
          this.router.navigate(['/'])
          location.reload();

          
        }
        else
        {
          this.router.navigate(['/register'])
        }
      },
      (error) => { console.log(error);

    })
  }

  loginUser(user: any)
  {
    let username = user[0].value;
    let pass = user[1].value
    
    let userData = this.http.post<any>('http://localhost:3000/login', {username, pass}).subscribe(
      (res) => { 
        this.data = res
        if( this.data ) {
          localStorage.setItem('user', JSON.stringify([this.data]))
          this.router.navigate(['/'])
          location.reload();
          
        }
        else
        {
          this.router.navigate(['/login'])

          
        }
      },
      (error) => {
          document.cookie = error.error
          location.reload()


        
      })

    } 

  logoutUser()
  {
    
    if(localStorage.getItem('user'))
    {
      localStorage.clear()
      this.router.navigate(['/'])
      location.reload();
    }
    else
    {
      this.router.navigate(['/'])
    }

    
  }

}
