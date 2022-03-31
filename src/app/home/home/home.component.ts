import { Component, OnInit } from '@angular/core';
import {AuthService}  from '../../../auth.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private src: AuthService) { }
  isUser: any;
  ngOnInit(): void {
    this.isUser = localStorage.getItem('user')
    this.isUser = JSON.parse(this.isUser)

  }
}
