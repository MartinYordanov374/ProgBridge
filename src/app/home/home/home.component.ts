import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { CRUDService } from 'src/app/crud.service';
import {AuthService}  from '../../../auth.service'
import {Router} from '@angular/router'
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private src: AuthService, 
              private service: CRUDService, 
              private router: Router, 
              private cdr:ChangeDetectorRef, 
              private zone: NgZone) {}
  
  isUser: any;
  charactersLeft: number = 120;
  allPosts: any = [];

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
    this.getAllPosts()

  }

  deletePost(post: any)
  {
    let postData = post
    console.log(postData)
    let postID = postData['_id']
    let ownerID = postData['Author']['_id']
    let userID = this.isUser[0]['_id']
    if(userID == ownerID)
    {
      this.service.deletePost(postID)
      // console.log('owner confirmed')
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
    
  }

  addLike(post:any)
  {
    let postID = post.id
    let likeGiver = this.isUser[0]._id
    this.zone.run(() => {
      this.service.addLike(likeGiver,postID)
      this.router.navigateByUrl('/')
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
    this.service.getAllPosts()
    if(localStorage.getItem('posts'))
    {
      this.allPosts = localStorage.getItem('posts')
      this.allPosts = JSON.parse(this.allPosts)
      this.allPosts = this.allPosts[0]
      this.cdr.detectChanges();
    }
    console.log(this.allPosts.sort((a:any, b:any) => b.Likes.length - a.Likes.length) )
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




}