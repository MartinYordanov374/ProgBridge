import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'
import { AuthService } from 'src/auth.service';
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private service: CRUDService, private router: Router, private route: ActivatedRoute) { }
  userData: any;
  allUserPosts: any;
  ownerID: any;
  isOwner: any;
  isFollowing: any;

  ngOnInit(): void {
    let userID = this.router.url.split('/')[2]

    this.userData = this.service.getUserById(userID)

    
    this.userData = localStorage.getItem('profileData')
    this.userData = JSON.parse(this.userData)
    this.userData = this.userData[0]
    
    console.log(this.userData.followers)

    this.service.getAllUserPosts(this.userData['_id'])

    this.allUserPosts = localStorage.getItem('userPosts')
    this.allUserPosts = JSON.parse(this.allUserPosts)
    this.allUserPosts = this.allUserPosts[0]

    this.ownerID = localStorage.getItem('user')
    this.ownerID = JSON.parse(this.ownerID)
    this.ownerID = this.ownerID[0]._id

    this.isFollowing = this.userData.followers.some((user: any) => user._id == this.ownerID)
    // console.log(this.isFollowing)

    if(this.ownerID == userID)
    {
      this.isOwner = true;
    }


  }

  showFriends(friendsList: any, postsList: any,sharedList: any, FollowingList: any) : void
  {
    friendsList.style.display = "block"
    postsList.style.display = "none"
    sharedList.style.display = "none"
    FollowingList.style.display="none"
  }

  showFollowing(friendsList: any, postsList: any,sharedList: any, FollowingList: any) : void
  {
    friendsList.style.display = "none"
    postsList.style.display = "none"
    sharedList.style.display = "none"
    FollowingList.style.display="block"
  }

  showPosts(friendsList: any, postsList: any, sharedList: any, FollowingList: any):void
  {
    friendsList.style.display = "none"
    postsList.style.display = "block"
    sharedList.style.display = "none"
    FollowingList.style.display="none"

  }

  showShared(friendsList: any, postsList: any, sharedList: any, FollowingList: any):void
  {
    friendsList.style.display = "none"
    postsList.style.display = "none"
    sharedList.style.display = "block"
    FollowingList.style.display="none"

  }

  addLike(card: any)
  {

  }
  showComments(commWrapper: any){

  }
  addComment(content: any)
  {

  }

  showChangePFP(container: any, darkOverlay: any, ICam: any)
  {
    container.style.display='block'
    darkOverlay.style.display='block'
    ICam.style.display='none'
    
  }

  changePFP(userData: any, imageLink: any)
  {
    console.log('changing profile pic')
    this.service.changePFP(userData, imageLink)
    let profileID = this.route.snapshot.params['id']
    this.router.navigateByUrl('/profile/'+profileID)
  }

  FollowUser(card: any)
  {
    let targetUserID = card._id // ADD TO OWNER'S FOLLOWING
    let currentUserID = this.ownerID // ADD TO TARGET'S FOLLOWERS

    this.service.addFollower(targetUserID, this.ownerID)
    this.service.addFollowing(currentUserID, targetUserID)

    
  }
}
