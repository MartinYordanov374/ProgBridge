import { Component, OnChanges, OnInit, SimpleChange,SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CRUDService } from '../crud.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private service: CRUDService) { }
  isUser: any ;
  ngOnInit(): void {
      this.isUser = localStorage.getItem('user')
      this.isUser = JSON.parse(this.isUser)
      
  }
  hideSearchIcon(icon: any)
  {
    icon.style.display = "none"
  }

}
