import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client'
import { CRUDService } from '../crud.service';
@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private service: CRUDService) { }
  
  userFollowers: any;

  ngOnInit(): void {
    let userID = this.route.snapshot.params['id']

    this.service.getUserById(userID)
    this.userFollowers = localStorage.getItem('profileData')
    this.userFollowers = JSON.parse(this.userFollowers)
    this.userFollowers = this.userFollowers[0].followers


    // const socket = io.connect('http://localhost:3000/')
    // socket.on('connect', () => {
    //   console.log('Successfully connected!');
      
    //   socket.emit('senderID', userID)

    // });

  }

}
