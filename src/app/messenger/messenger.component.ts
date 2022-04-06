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
  contactData: any = '';
  senderId: any;
  receiverId: any;
  messages: any = '';
  receiverName: any = '';
  senderName: any = '';
  ngOnInit(): void {
    
    let userID = this.route.snapshot.params['id']
    
    this.service.getFollowersByID(userID)
    this.senderId = userID;
    
    this.userFollowers = localStorage.getItem('followers')
    this.userFollowers = JSON.parse(this.userFollowers)

    socket.on('connect', () => {
      console.log('Successfully connected!');

    });
    
  }
  
  showChatBox(contact: any, chatBox: any, defaultMessage: any)
  {
    let contactID = contact.id
    this.service.getContactDataByID(contactID)
    
    this.contactData = localStorage.getItem('contactData')
    this.contactData = JSON.parse(this.contactData)
    this.contactData = this.contactData[0]

    this.receiverId = this.contactData._id
    
    chatBox.style.display = 'block'
    defaultMessage.style.display = 'none'

    this.service.getConvo(this.receiverId, this.senderId)

    this.messages = localStorage.getItem('messages')
    this.messages = JSON.parse(this.messages)
    this.messages = this.messages[0]

    this.senderName = this.messages.Sender.username
    this.receiverName = this.messages.Receiver.username
  }

  sendMsg(msgContent: any)
  {
    socket.emit('sendMSG', ({senderID: this.senderId, receiverID: this.receiverId, content: msgContent.value }))
  }
}
