import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private http: HttpClient, private router: Router) { }
  public createPostURL = 'http://localhost:3000/createPost'
  public getAllPostsUrl = 'http://localhost:3000/getAllPosts'
  public deletePostUrl = 'http://localhost:3000/deletePost/'

  private data: any;
  createPost(postData: any)
  { 
    this.http.post(this.createPostURL, postData).subscribe()
  }

  getAllPosts(){
    let result = this.http.get(this.getAllPostsUrl).subscribe(
      (res) => { 
        this.data = res

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
}
