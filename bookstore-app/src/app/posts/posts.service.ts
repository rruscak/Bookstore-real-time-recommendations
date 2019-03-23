import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// No need to import it in app.modules and also it becomes singleton
@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[], count: number }>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getPost(id: number) {
    return this.http.get<Post>('http://localhost:3000/api/posts/' + id);
  }

  getPosts(limit: number, page: number) {
    const queryParams = `?limit=${limit}&page=${page}`;
    this.http.get<{ posts: Post[], count: number }>('http://localhost:3000/api/posts' + queryParams)
      .subscribe((res) => {
        console.log(res);
        this.posts = res.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          count: res.count
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  // findPost(id: string) {
  //   return {...this.posts.find(p => p.id.toString() === id)};
  // }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.http.post<{ id: number; imagePath: string }>('http://localhost:3000/api/posts', postData)
      .subscribe(res => {
        // const post: Post = {
        //   id: res.id,
        //   title,
        //   content,
        //   imagePath: res.imagePath
        // };
        // this.posts.push(post);
        // // this will create a copy of the array
        // this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(id: number, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof (image) === 'object') {
      postData = new FormData();
      // @ts-ignore
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id, title, content, imagePath: image
      };
    }
    this.http.put<{ imagePath: string }>('http://localhost:3000/api/posts', postData)
      .subscribe(res => {
        // const updatedPosts = [...this.posts];
        // const oldPostIndex = updatedPosts.findIndex((p) => p.id === id);
        // updatedPosts[oldPostIndex] = {
        //   id,
        //   title,
        //   content,
        //   imagePath: res.imagePath
        // };
        // this.posts = updatedPosts;
        // this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(id: number) {
    return this.http.delete('http://localhost:3000/api/posts/' + id);
  }
}
