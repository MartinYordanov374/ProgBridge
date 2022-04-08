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
  public changePFP_URL = 'http://localhost:3000/changePFP/'
  public editPost_URL = 'http://localhost:3000/edit/'
  public addFollowing_URL = 'http://localhost:3000/addFollowing/'
  public addFollower_URL = 'http://localhost:3000/addFollower/'
  public getConvo_URL = 'http://localhost:3000/getConvo'
  public addCommentLike_URL = 'http://localhost:3000/addCommentLike/'

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
          this.data.sort((a : any,b : any) => b.Likes.length - a.Likes.length)
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

  getContactDataByID(userID: any)
  {
    this.http.get(this.getUserByID_URL+userID).subscribe(
      (res)=>{
        this.zone.run(() => {
          this.data = res
          localStorage.setItem('contactData', JSON.stringify([this.data]))
        })
      }
    )
  }
  getFollowersByID(userID: any)
  {
    this.http.get(this.getUserByID_URL+userID).subscribe(
      (res)=>{
        this.zone.run(() => {
          this.data = res
          localStorage.setItem('followers', JSON.stringify(this.data.followers))
        })
      }
    )
  }


  getConvo(receiverID: any, senderID: any)
  {
    this.http.post(this.getConvo_URL, {receiverID: receiverID, senderID: senderID}).subscribe((res)=>{
      localStorage.setItem('messages', JSON.stringify([res]))
    })
  }

  sharePost(sharedPostObj: any)
  {
    this.zone.run(() => {
      this.http.post(this.sharePostURL + sharedPostObj['post'], sharedPostObj).subscribe()
    })
  }

  changePFP(userID: any, imageLink: any){
    this.http.post(this.changePFP_URL + userID, {img: imageLink}).subscribe(
      (res) => {
        this.zone.run(() => {
          this.data=res
          localStorage.setItem('user', JSON.stringify([this.data]))
        })
      })
  }

  editPost(postID: any, updatedPostContent: any, userID: any)
  {
    this.http.post(this.editPost_URL+postID, {updated: updatedPostContent, userID: userID}).subscribe()
  }

  addFollowing(ownerID: any, targetUserID: any)
  {
    this.http.post(this.addFollowing_URL + ownerID, {targetUserID: targetUserID}).subscribe()
  }

  addFollower(targetUserID: any, ownerID: any)
  {
    this.http.post(this.addFollower_URL + targetUserID, {ownerID: ownerID}).subscribe()
  }

  addCommentLike(targetCommentID : any, userID: any)
  {
    this.http.post(this.addCommentLike_URL + targetCommentID, {userID: userID}).subscribe()
  }


}
