import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  myData: any;
  constructor(private auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.myData = 'test'
  }
  registerUser(user: any)
  {
    // let userData = this.auth.registerUser(user).subscribe((response: any) => {
    //   console.log(response);
    // });

    let username = user[0].value;
    let pass = user[1].value
    let repass = user[2].value

    let userData = this.http.post<any>('http://localhost:3000/register', {username, pass, repass}).subscribe(
      (res) => { this.myData = res},
      (error) => { console.log(error); }
    )

    console.log(this.myData)
  }

}
