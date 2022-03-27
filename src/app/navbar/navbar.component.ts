import { Component, OnChanges, OnInit, SimpleChange,SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges {

  constructor(private router: Router) { }
  isUser: any ;
  ngOnInit(): void {
    this.isUser = localStorage.getItem('user')
    console.log(this.isUser)
  }
  
  ngOnChanges(changes: SimpleChanges)
  {
    
  }

}
