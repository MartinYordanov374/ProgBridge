import { Component, OnInit } from '@angular/core';
import { CRUDService } from 'src/app/crud.service';
import {AuthService}  from '../../../auth.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private src: AuthService, private service: CRUDService) { }
  isUser: any;
  charactersLeft: number = 120;
  
  ngOnInit(): void {
    this.isUser = localStorage.getItem('user')
    this.isUser = JSON.parse(this.isUser)

  }
  keyup(textarea: any): void{
    this.charactersLeft =  120 - textarea.value.length

  }
  clearTextArea(textarea: any):void{
    textarea.value = ""
  }

  createPost(textarea: any):void{
    this.service.createPost(textarea)
  }
}
