import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  data: any = ''
  registerURL = 'http://localhost:3000/register'
  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: any)
  {
    let username = user.username.value
    let pass = user.password.value
    let repass = user.repass.value
    this.http.post(this.registerURL, {username, pass, repass}).subscribe(res=> console.log(res), err => console.log(err))

    // document.cookie = this.data
    this.router.navigate(['/'])
  }
}
