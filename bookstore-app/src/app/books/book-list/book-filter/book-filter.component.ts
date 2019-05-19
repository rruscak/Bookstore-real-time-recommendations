import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BooksService } from '../../books.service';
import { Genre } from '../../genre.model';
import { MatButtonToggleChange } from '@angular/material';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss']
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

  onGenreCollapsed(genre: Genre) {
    genre.expanded = false;
    this.categoryId = null;
    this.categoryValues = [];
    this.checkAndEmitFilterChanged();
  }

  onGenreChanged(genre: Genre) {
    if (!this.filters.genres.find(g => g.expanded)) {
      genre.expanded = true;
      this.checkAndEmitFilterChanged();
    }
    genre.expanded = true;
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
    this.checkAndEmitFilterChanged();
  }

  private checkAndEmitFilterChanged() {
    const expandedCount = this.filters.genres.filter(g => g.expanded).length;
    if (expandedCount === 1) {
      const genre = this.filters.genres.find(g => g.expanded);
      this.genreId = genre.id;
      this.emitFilterChanged();
    } else if (expandedCount === 0) {
      this.genreId = null;
      this.emitFilterChanged();
    }
  }

  private emitFilterChanged() {
    console.log('Filter');
    this.filterChanged.emit({
      genreId: this.genreId,
      categoryId: this.categoryId
    });
  }
}
