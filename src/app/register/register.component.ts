import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  registerUser(user: any)
  {
    this.auth.registerUser(user)
    
  }

}
