import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.scss']
})
export class FindFriendsComponent implements OnInit {

  constructor(private service: CRUDService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    let userID = this.route.snapshot.params['id'];
    this.service.getUnfollowedUsers(userID)
  }

}
