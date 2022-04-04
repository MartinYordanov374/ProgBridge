import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { AuthService } from 'src/auth.service';
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private service: CRUDService, private router: Router) { }
  userData: any;
  allUserPosts: any;
  ownerID: any;
  isOwner: any;

  ngOnInit(): void {
    let userID = this.router.url.split('/')[2]

    this.userData = this.service.getUserById(userID)

    this.userData = localStorage.getItem('profileData')
    this.userData = JSON.parse(this.userData)
    this.userData = this.userData[0]


    this.service.getAllUserPosts(this.userData['_id'])

    this.allUserPosts = localStorage.getItem('userPosts')
    this.allUserPosts = JSON.parse(this.allUserPosts)
    this.allUserPosts = this.allUserPosts[0]

    let profileUserID = this.userData._id
    this.ownerID = localStorage.getItem('user')
    this.ownerID = JSON.parse(this.ownerID)
    this.ownerID = this.ownerID[0]._id

    if(this.ownerID == userID)
    {
      this.isOwner = true;
    }

    console.log(this.userData)

  }

  showFriends(friendsList: any, postsList: any,sharedList: any):void
  {
    friendsList.style.display = "block"
    postsList.style.display = "none"
    sharedList.style.display = "none"

  }

  showPosts(friendsList: any, postsList: any, sharedList: any):void
  {
    friendsList.style.display = "none"
    postsList.style.display = "block"
    sharedList.style.display = "none"

  }

  showShared(friendsList: any, postsList: any, sharedList: any):void
  {
    friendsList.style.display = "none"
    postsList.style.display = "none"
    sharedList.style.display = "block"
  }

  addLike(card: any)
  {

  }
  showComments(commWrapper: any){

  }
  addComment(content: any)
  {

  }

  showChangePFP(container: any)
  {
    container.style.display='block'
    // this.service.changePFP(userID)
  }

  changePFP(userData: any, imageLink: any)
  {
    console.log('changing profile pic')
    this.service.changePFP(userData, imageLink)
  }
}
