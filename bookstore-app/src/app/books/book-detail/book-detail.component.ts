import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { BooksService } from '../books.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  isLoading = false;
  private bookId: string;
  book: Book;

  constructor(public booksService: BooksService,
              public route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('bookId')) {
        this.bookId = paramMap.get('bookId');
        console.log(this.bookId);
        this.isLoading = true;
        this.booksService
          .getBook(Number(this.bookId))
          .subscribe((res) => {
            this.isLoading = false;
            if (res) {
              console.log(res);
              this.book = res;
            } else {
              this.router.navigate(['/']);
            }
          });
      } else {
        this.router.navigate(['/']);
      }
    });
  }

}
