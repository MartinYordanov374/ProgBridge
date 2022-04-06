import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client'
import { CRUDService } from '../crud.service';

const socket = io.connect('http://localhost:3000/')

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private service: CRUDService) { }
  
  userFollowers: any;
  contactData: any;
  senderId: any;
  ngOnInit(): void {
    
    let userID = this.route.snapshot.params['id']
    this.service.getUserById(userID)
    this.senderId = userID;
    
    this.userFollowers = localStorage.getItem('profileData')
    this.userFollowers = JSON.parse(this.userFollowers)
    this.userFollowers = this.userFollowers[0].followers

    socket.on('connect', () => {
      console.log('Successfully connected!');

    });
    
  }
  
  showChatBox(contact: any, chatBox: any, defaultMessage: any)
  {
    let contactID = contact.id
    this.service.getContactById(contactID)
    this.contactData = localStorage.getItem('contactData')
    this.contactData = JSON.parse(this.contactData)
    this.contactData = this.contactData[0]
    
    chatBox.style.display = 'block'
    defaultMessage.style.display = 'none'

    socket.emit('receiverID', contactID)
    socket.emit('senderID', this.senderId)


  }
}
