import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as postActions from './actions/crud.actions'

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private http: HttpClient, private router: Router, private zone:NgZone, private store: Store) 
  { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }
  //#region URLS
  public createPostURL = 'http://localhost:3000/createPost'
  public getAllPostsUrl = 'http://localhost:3000/getAllPosts'
  public getAllUserPostsUrl = 'http://localhost:3000/getAllUserPosts/'
  public deletePostUrl = 'http://localhost:3000/deletePost/'

  public addCommentURL = 'http://localhost:3000/addComment/'
  public addLikeURL = 'http://localhost:3000/likePost/'
  public removeLikeURL = 'http://localhost:3000/removeLike/'
  public getUserByID_URL = 'http://localhost:3000/getUserByID/'
  public sharePostURL = 'http://localhost:3000/sharePost/'
  //#endregion
  private data: any;
  createPost(postData: any)
  { 
    this.http.post(this.createPostURL, postData).subscribe(
      (res) => { 
        this.zone.run(() => {
          this.data = res
          this.store.dispatch(new postActions.AddPost(this.data))


        })

    },
    (error) => { console.log(error)})
 
  }

  getAllPosts(){
    let result = this.http.get(this.getAllPostsUrl).subscribe(
      (res) => {
        this.zone.run( () => { 
          this.data = res
          this.store.dispatch(new postActions.AddPost(this.data))

        })
      },
      (error) => { console.log(error);

    })
  }

  getAllUserPosts(userID: any)
  {
    
    this.http.get(this.getAllUserPostsUrl+userID, {}).subscribe(
      (res)=> {
        this.zone.run(() => {
          this.data = res;
          localStorage.setItem('userPosts', JSON.stringify([this.data]))
        })
    })
  }

  deletePost(postID: any){

    this.http.post(this.deletePostUrl + postID, {}).subscribe()
  }
    

  addComment(commentContent: any, postID:any, ownerID: any)
  {
    let commentData = {content: commentContent, targetPost: postID, commentAuthor: ownerID}
    this.zone.run(() => {
      this.http.post(this.addCommentURL + postID, commentData).subscribe((res) => {
        this.data = res;
        alert(this.data['error'])
      })
         
    })
  }

  addLike(likeGiverID: any, postID: any)
  {    
    let likeData = {likeGiverID: likeGiverID, targetPost: postID}
    this.zone.run(() => {
      this.http.post(this.addLikeURL + postID, likeData).subscribe()
    })
  }

  getUserById(userID: any)
  {
    this.http.get(this.getUserByID_URL+userID).subscribe(
      (res)=>{
        this.zone.run(() => {
          this.data = res
          localStorage.setItem('profileData', JSON.stringify([this.data]))
        })
      }
    )
  }

  sharePost(sharedPostObj: any)
  {
    this.zone.run(() => {
      this.http.post(this.sharePostURL + sharedPostObj['post'], sharedPostObj).subscribe()
    })
  }


}
