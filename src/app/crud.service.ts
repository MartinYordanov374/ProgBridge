import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor() { }

  createPost(postData: any)
  { 
    console.log('creating post')
  }
}
