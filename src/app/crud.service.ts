import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private http: HttpClient) { }
  public createPostURL = 'http://localhost:3000/createPost'

  createPost(postData: any)
  { 
    this.http.post(this.createPostURL, postData).subscribe()
  }
}
