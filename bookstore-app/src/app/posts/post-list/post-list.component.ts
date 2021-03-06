import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  isLoading = false;
  posts: Post[] = [];
  totalPosts = 0;
  pageSize = 5;
  currentPage = 1;
  pageSizeOptions = [2, 5, 10, 50];
  isAuth = false;
  userId: number;
  private postsSubs: Subscription;
  private authStatusSub: Subscription;

  constructor(public postsService: PostsService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.pageSize, this.currentPage);
    this.postsSubs = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[], count: number }) => {
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.count;
      });

    // Authentication
    this.isAuth = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuth = isAuthenticated;
        this.userId = this.authService.getUserId();
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
    this.authStatusSub.unsubscribe();
  }

  onDelete(id: number) {
    this.isLoading = true;
    this.postsService.deletePost(id)
      .subscribe(() => {
        this.postsService.getPosts(this.pageSize, this.currentPage);
      }, () => {
        this.isLoading = false;
      });
  }
}
