import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.scss']
})
export class FindFriendsComponent implements OnInit {

  constructor(private service: CRUDService,private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  public unfollowedUsers: any;
  private userID: any;
  ngOnInit(): void {
    this.userID = this.route.snapshot.params['id'];
    this.http.post('http://localhost:3000/getUnfollowedUsers/'+ this.userID, {userID: this.userID}).subscribe((res) => {
      this.unfollowedUsers = res
    })
  }

  FollowUser(card: any)
  {
    let targetUserID = card._id // ADD TO OWNER'S FOLLOWING
    let currentUserID = this.userID // ADD TO TARGET'S FOLLOWERS

    this.service.addFollower(targetUserID, currentUserID)
    this.service.addFollowing(currentUserID, targetUserID)

    this.router.navigateByUrl('/findFriends/'+this.userID)
    

    
  }


}
