import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Book } from '../shared/models/book.model';
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @Input() carouselTitle: string;
  @Input() books: Book[];
  @ViewChild('nav', {read: DragScrollComponent}) ds: DragScrollComponent;

  constructor() {
  }

  ngOnInit() {

  }

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  moveTo(index) {
    this.ds.moveTo(index);
  }

  ngAfterViewInit() {
    // Starting ngx-drag-scroll from specified index(3)
    // setTimeout(() => {
    //   if (this.ds) {
    //     this.ds.moveTo(1);
    //   }
    // }, 1000);
    // setTimeout(() => {
    //   if (this.ds) {
    //     this.ds.moveTo(0);
    //   }
    // }, 1400);
  }

}
