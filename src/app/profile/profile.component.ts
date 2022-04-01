import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth.service';
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private service: CRUDService) { }
  userData: any;
  allUserPosts: any;
  
  ngOnInit(): void {
    this.userData = localStorage.getItem('user')
    this.userData = JSON.parse(this.userData)
    this.userData = this.userData[0]

    this.service.getAllUserPosts(this.userData['_id'])

    this.allUserPosts = localStorage.getItem('userPosts')
    this.allUserPosts = JSON.parse(this.allUserPosts)
    this.allUserPosts = this.allUserPosts[0].posts
    console.log(this.allUserPosts)
    console.log(this.userData)
  }

  showFriends(friendsList: any, postsList: any):void
  {
    friendsList.style.display = "block"
    postsList.style.display = "none"
  }
  showPosts(friendsList: any, postsList: any):void
  {
    friendsList.style.display = "none"
    postsList.style.display = "block"
  }

}
