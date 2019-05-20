import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange, MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-book-sorter',
  templateUrl: './book-sorter.component.html',
  styleUrls: ['./book-sorter.component.scss']
})
export class BookSorterComponent implements OnInit {
  @Output() sortingChanged = new EventEmitter<{ orderBy: string, orderDir: string }>();
  sortOrders: { value: string, name: string }[];
  defaultOrder: { value: string, name: string };

  orderBy = 'name';
  orderDir = 'ASC';

  constructor() {
  }

  ngOnInit() {
    this.sortOrders = [
      {value: 'name', name: 'Name'},
      {value: 'rating', name: 'Rating'},
      {value: 'price', name: 'Price'},
      {value: 'date', name: 'Release Date'}
    ];
    this.defaultOrder = this.sortOrders[0];
  }

  onOrderByChanged(event: MatSelectChange) {
    console.log('CHANGED ORDER BY');
    this.orderBy = event.value;
    this.emitSortingChange();
  }

  onOrderDirChanged(event: MatButtonToggleChange) {
    console.log('CHANGED ORDER DIR');
    this.orderDir = event.value;
    this.emitSortingChange();
  }

  private emitSortingChange() {
    this.sortingChanged.emit({
      orderBy: this.orderBy,
      orderDir: this.orderDir
    });
  }
}
