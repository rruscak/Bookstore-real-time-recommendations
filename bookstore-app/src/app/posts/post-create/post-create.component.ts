import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  isLoading = false;
  private mode = 'CREATE';
  private postId: string;
  post: Post;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(Number(this.postId)).subscribe((res) => {
          this.isLoading = false;
          console.log(res);
          if (res) {
            this.mode = 'EDIT';
            this.post = res;
          } else {
            this.mode = 'CREATE';
            this.postId = null;
          }
        });
      } else {
        this.mode = 'CREATE';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    console.log(this.mode);
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'CREATE') {
      this.postsService.addPost(form.value.title, form.value.content, null);
    } else {
      this.postsService.updatePost(this.post.id, form.value.title, form.value.content);
    }
    form.resetForm();
  }
}
