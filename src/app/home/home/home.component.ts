import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { CRUDService } from 'src/app/crud.service';
import {AuthService}  from '../../../auth.service'
import {Router} from '@angular/router'
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as postActions from './../../actions/crud.actions'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Observable<Post[]>
  
  isUser: any;
  charactersLeft: number = 120;
  allPosts: any = [];
  editedPostID: any = '';

  constructor(private src: AuthService, 
              private service: CRUDService, 
              private router: Router, 
              private cdr:ChangeDetectorRef, 
              private zone: NgZone,
              private store: Store<AppState>) {
                this.posts = this.store.select('post')
                this.posts.forEach(x => this.allPosts = x[1] )
              }

  ngOnInit(): void {
    this.isUser = localStorage.getItem('user')
    this.isUser = JSON.parse(this.isUser)
    this.getAllPosts();

  }

  keyup(textarea: any): void{
    this.charactersLeft =  120 - textarea.value.length

  }
  clearTextArea(textarea: any):void{
    textarea.value = ""
  }

  createPost(textarea: any):void{
    let postData = {
      content: textarea.value,
      owner: this.isUser[0]._id
    }
    this.service.createPost(postData)
    this.getAllPosts()
    location.reload()

  }

  deletePost(post: any)
  {
    let postData = post
    let postID = postData['_id']
    let ownerID = postData['Author']['_id']
    let userID = this.isUser[0]['_id']
    if(userID == ownerID)
    {
      this.service.deletePost(postID)
      this.getAllPosts()
      location.reload()
    }
    else
    {
      console.log('Not Owner')
    }

  }

  addComment(comment: any)
  {
    let commentContent = comment.value
    let commentPostID = comment.id
    
    let ownerID = this.isUser[0].username
    this.service.addComment(commentContent, commentPostID, ownerID)
    this.getAllPosts();
    location.reload()
    
  }

  addLike(post:any)
  {
    let postID = post.id
    let likeGiver = this.isUser[0]._id
    this.zone.run(() => {
      this.service.addLike(likeGiver,postID)
      location.reload()

    })
  }

  showComments(comment: any)
  {
    if(comment.style.display=="none")
    {
      comment.style.display = "initial";
    }
    else
    {
      comment.style.display = "none"
    }
      
  }
  getAllPosts()
  {
      let res = this.service.getAllPosts()
      this.posts = this.store.select('post')
      this.posts.forEach(x => this.allPosts = x[1] )
      
    
  }

  SharePost(card: any)
  {
    // let postAuthor = card.children[0].children[0].innerText
    // let postContent = card.children[1].children[0].innerText
    let postSharerID = this.isUser[0]._id
    let sharedPostID = card.id

    let sharePostObj ={sharer: postSharerID, post: sharedPostID}
    
    this.service.sharePost(sharePostObj)
    alert('You successfully shared this post !')
  }

  showEditPostField(editPostField: any, editedPost: any, darkOverlay: any)
  {
    this.editedPostID = editedPost.id
    
    editPostField.style.display = 'block'
    darkOverlay.style.display = 'block'

    let allPostContainers = document.querySelectorAll('.card')

    let allPostContainersArray = Array.prototype.slice.call(allPostContainers,2)

    allPostContainersArray.forEach(post => post.style.opacity = 0.45)

    let editedPostContent = editedPost.children[1].children[0].innerText

    editPostField.children[0].value = editedPostContent

  }

  editPost(editInput: any, userID: any)
  {
      let editedPostContent = editInput.value

      this.service.editPost(this.editedPostID, editedPostContent, userID)

      location.reload()

  }

  addCommentLike(targetComment:any)
  {
    let likerID = this.isUser[0]._id
    let targetCommentID = targetComment._id
    this.service.addCommentLike(targetCommentID,likerID)
    location.reload()
  }

}