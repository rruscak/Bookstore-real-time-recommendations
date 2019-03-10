import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  isLoading = false;
  posts: Post[] = [];
  private postsSubs: Subscription;

  constructor(public postsService: PostsService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSubs = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  // it is important to unsubscribe when component is destroyed, to prevent memory leaks
  ngOnDestroy(): void {
    this.postsSubs.unsubscribe();
  }

  onDelete(id: number) {
    this.postsService.deletePost(id);
  }
}
