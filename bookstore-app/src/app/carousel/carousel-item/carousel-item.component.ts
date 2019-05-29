import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../shared/models/book.model';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit {
  @Input() book: Book;
  clicked = false;

  constructor() {
  }

  onMouseDown() {
    this.clicked = true;
    console.log('A');
  }

  ngOnInit(): void {
    console.log(this.book.id);
    console.log(this.book);
  }
}
