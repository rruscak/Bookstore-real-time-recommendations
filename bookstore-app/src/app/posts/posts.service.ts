import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// No need to import it in app.modules and also it becomes singleton
@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getPost(id: number) {
    return this.http.get<Post>('http://localhost:3000/api/posts/' + id);
  }

  getPosts() {
    this.http.get<Post[]>('http://localhost:3000/api/posts')
      .subscribe((res) => {
        console.log(res);
        this.posts = res;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  // findPost(id: string) {
  //   return {...this.posts.find(p => p.id.toString() === id)};
  // }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title, content};
    this.http.post<{ id: number }>('http://localhost:3000/api/posts', post)
      .subscribe(res => {
        console.log(res.id);
        post.id = res.id;
        this.posts.push(post);
        // this will create a copy of the array
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(id: number, title: string, content: string) {
    const post: Post = {id, title, content};
    this.http.put('http://localhost:3000/api/posts', post)
      .subscribe(() => {
        console.log('Edited');
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((p) => p.id === id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(id: number) {
    console.log(id);
    this.http.delete('http://localhost:3000/api/posts/' + id)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
