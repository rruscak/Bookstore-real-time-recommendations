import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../books.service';
import { Genre } from '../../genre.model';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.css']
})
export class BookFilterComponent implements OnInit {
  isLoading = false;
  filters: { genres: Genre[] } = { genres: []};

  constructor(public booksService: BooksService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.booksService.getFilters()
      .subscribe(res => {
        if (res) {
          // console.log(res);
          console.log(res);
          res.forEach((g) => this.filters.genres.push(g));
          console.log(this.filters.genres);
          this.isLoading = false;
        }
      });
    console.log(this.filters.genres);

    //
    // this.filters = {
    //   genres: [
    //     ({
    //       name: 'Fiction',
    //       categories: [
    //         {name: 'World fiction'},
    //         {name: 'Romance fiction'},
    //         {name: 'Sci-fi, fantasy'},
    //         {name: 'Historic fiction'},
    //         {name: 'True Stories'},
    //         {name: 'Humor, satire'},
    //         {name: 'Detectives, thrillers, horrors'},
    //         {name: 'Novels, short stories, anthologies'},
    //         {name: 'Others'}
    //       ]
    //     }), ({
    //       name: 'Biography',
    //       categories: [
    //         {name: 'Biography - others'},
    //         {name: 'Business'},
    //         {name: 'History, politics'}
    //       ]
    //     }), ({
    //       name: 'Poetry',
    //       categories: [
    //         {name: 'Slovak poetry'},
    //         {name: 'Czech poetry'},
    //         {name: 'World poetry'}
    //       ]
    //     })
    //   ]
    // };
  }

}
