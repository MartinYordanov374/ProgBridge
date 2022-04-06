import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client'
@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {
  
  constructor() { }
  
  ngOnInit(): void {
    

    const socket = io.connect('http://localhost:3000/')
    socket.on('connect', () => {
      console.log('Successfully connected!');
      

    });

  }

}
