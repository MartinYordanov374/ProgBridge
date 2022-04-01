import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private http: HttpClient, private router: Router) 
  { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }
  public createPostURL = 'http://localhost:3000/createPost'
  public getAllPostsUrl = 'http://localhost:3000/getAllPosts'
  public deletePostUrl = 'http://localhost:3000/deletePost/'
  public addCommentURL = 'http://localhost:3000/addComment/'
  public addLikeURL = 'http://localhost:3000/likePost/'
  public removeLikeURL = 'http://localhost:3000/removeLike/'

  private data: any;

  createPost(postData: any)
  { 
    this.http.post(this.createPostURL, postData).subscribe()
 
  }

  getAllPosts(){
    let result = this.http.get(this.getAllPostsUrl).subscribe(
      (res) => { 
        this.data = res

        localStorage.removeItem('posts')
        localStorage.setItem('posts', JSON.stringify([this.data]))

      },
      (error) => { console.log(error);

    })
  }

  deletePost(postID: any){
    this.http.post(this.deletePostUrl + postID, {}).subscribe(
      (res) => {
        this.data = res
        
      }
      )
    }

  addComment(commentContent: any, postID:any, ownerID: any)
  {
    let commentData = {content: commentContent, targetPost: postID, commentAuthor: ownerID}
    this.http.post(this.addCommentURL + postID, commentData).subscribe()
  }

  addLike(likeGiverID: any, postID: any)
  {    
    let likeData = {likeGiverID: likeGiverID, targetPost: postID}

    this.http.post(this.addLikeURL + postID, likeData).subscribe()
  }

}
