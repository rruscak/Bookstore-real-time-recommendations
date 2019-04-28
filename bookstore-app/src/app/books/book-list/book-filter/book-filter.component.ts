import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.css']
})
export class BookFilterComponent implements OnInit {
  filters: { genres: { name: string, categories: { name: string }[] }[] };

  constructor() {
  }

  ngOnInit() {
    this.filters = {
      genres: [
        ({
          name: 'Fiction',
          categories: [
            {name: 'World fiction'},
            {name: 'Romance fiction'},
            {name: 'Sci-fi, fantasy'},
            {name: 'Historic fiction'},
            {name: 'True Stories'},
            {name: 'Humor, satire'},
            {name: 'Detectives, thrillers, horrors'},
            {name: 'Novels, short stories, anthologies'},
            {name: 'Others'}
          ]
        }), ({
          name: 'Biography',
          categories: [
            {name: 'Biography - others'},
            {name: 'Business'},
            {name: 'History, politics'}
          ]
        }), ({
          name: 'Poetry',
          categories: [
            {name: 'Slovak poetry'},
            {name: 'Czech poetry'},
            {name: 'World poetry'}
          ]
        })
      ]
    };
  }

}
