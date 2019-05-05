import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BooksService } from '../../books.service';
import { Genre } from '../../genre.model';
import { MatButtonToggleChange } from '@angular/material';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.css']
})
export class BookFilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<{ genreId: number, categoryId: number }>();
  isLoading = false;
  filters: { genres: Genre[] } = {genres: []};
  genreId: number = null;
  categoryId: number = null;
  categoryValues: number[] = [];

  constructor(public booksService: BooksService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.booksService.getFilters()
      .subscribe(res => {
        if (res) {
          res.forEach((g) => this.filters.genres.push(g));
        }
        this.isLoading = false;
      });
  }

  onGenreCollapsed() {
    this.genreId = null;
    this.categoryId = null;
    console.log(this.categoryValues);
    this.categoryValues = [];
    this.emitFilterChanged();
  }

  onGenreChanged(genreId: number) {
    this.genreId = genreId;
    this.emitFilterChanged();
  }

  onCategoryChanged(event: MatButtonToggleChange) {
    const toggle = event.source;
    this.categoryId = null;
    if (toggle) {
      const group = toggle.buttonToggleGroup;
      if (event.value.some(item => item === toggle.value)) {
        group.value = [toggle.value];
        this.categoryId = toggle.value;
      }
    }
    this.emitFilterChanged();
  }

  private emitFilterChanged() {
    this.filterChanged.emit({
      genreId: this.genreId,
      categoryId: this.categoryId
    });
  }
}
