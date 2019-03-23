import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  isLoading = false;
  posts: Post[] = [];
  totalPosts = 0;
  pageSize = 5;
  currentPage = 1;
  pageSizeOptions = [2, 5, 10, 50];
  private postsSubs: Subscription;

  constructor(public postsService: PostsService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.pageSize, this.currentPage);
    this.postsSubs = this.postsService.getPostUpdateListener()
      .subscribe((postData: { posts: Post[], count: number }) => {
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.count;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.pageSize = pageData.pageSize;
    this.currentPage = pageData.pageIndex + 1;
    this.postsService.getPosts(this.pageSize, this.currentPage);
  }

  // it is important to unsubscribe when component is destroyed, to prevent memory leaks
  ngOnDestroy(): void {
    this.postsSubs.unsubscribe();
  }

  onDelete(id: number) {
    this.postsService.deletePost(id)
      .subscribe(() => {
        this.postsService.getPosts(this.pageSize, this.currentPage);
      });
  }
}
