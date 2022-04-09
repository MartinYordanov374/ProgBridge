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
  
  constructor(private route: ActivatedRoute, private service: CRUDService, private router: Router) { }
  
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
      
      socket.on('getMessages', data => {
        
        this.messages = data
        let chatbox = document.querySelectorAll('.chatbox')[0]
        
        chatbox.replaceChildren('')

        this.messages.Messages.forEach((msg:any)=>{
          let messagesContainer = document.createElement('div')
          messagesContainer.className='messages'


          messagesContainer.replaceChildren('')
          
          let message = document.createElement('p')
          message.innerText= msg.Content
          
          if(this.senderId == msg.Sender)
          {
            message.className="userSent"
            message.style.cssText="text-align: right;background-color: #2568fb;color: white;width: 10%;margin-left: 90%;border-radius: 18px;display: inline-block;padding-top: 8px;padding-right: 12px;word-break: break-word;padding-left: 24px;padding-bottom: 8px;"
          }
          else
          {
            message.className="userReceived"
            message.style.cssText="text-align: left;background-color: #2568fb;color: white;width: 10%;margin-right: 74%;border-radius: 18px;display: inline-block;padding-top: 8px;padding-right: 12px;word-break: break-word;padding-left: 24px;padding-bottom: 8px;"
          }
  
          messagesContainer.appendChild(message)

          chatbox.appendChild(messagesContainer)
        })

        
      })
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


    socket.emit('getConvo', ({senderID: this.senderId, receiverID: this.receiverId}))

    socket.on('getMessages', data => {
      this.messages = data
    })

  }

  sendMsg(msgContent: any)
  {
    socket.emit('sendMSG', ({senderID: this.senderId, receiverID: this.receiverId, content: msgContent.value }))

    socket.on('getMessages', data => {
      this.messages = data
    })

  }
}
