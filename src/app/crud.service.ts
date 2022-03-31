import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private http: HttpClient) { }
  public createPostURL = 'http://localhost:3000/createPost'
  public getAllPostsUrl = 'http://localhost:3000/getAllPosts'

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
        console.log(this.data)
      },
      (error) => { console.log(error);

    })
  }
}
