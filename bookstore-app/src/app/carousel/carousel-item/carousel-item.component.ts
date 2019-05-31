import { Component, Input } from '@angular/core';
import { Book } from '../../shared/models/book.model';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent {
  @Input() book: Book;

  constructor() {
  }
}
