import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  userData: any;
  ngOnInit(): void {
    this.userData = localStorage.getItem('user')
    this.userData = JSON.parse(this.userData)
    this.userData = this.userData[0]
  }

}
