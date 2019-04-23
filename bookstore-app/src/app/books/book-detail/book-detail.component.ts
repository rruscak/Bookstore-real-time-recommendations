import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;

  constructor() {
  }

  ngOnInit() {
    this.book = new Book(
      1,
      'Book Title',
      'Author Name',
      'https://www.pantarhei.sk/media/catalog/product/cache/1/image/250x361/040ec09b1e35df139433887a97daa66f/m/e/metro-2035-91713.jpg',
      10.09
    );

    this.book.numOfPages = 250;
    this.book.weight = 0.37;
    this.book.inStock = 20;
    this.book.language = 'Slovak';
    this.book.releaseYear = '2017';
    this.book.isbn = '978-80-551-5260-8';
    this.book.about = 'Roland Deschain z Gileadu, posledný pištoľník v Stredsvete, ' +
      'samotár putujúci po ceste dobra a zla, stopuje tajuplného mága so schopnosťou ' +
      'oživovať mŕtvych, známeho iba ako muž v čiernom. Na svojej výprave po Mohainskej ' +
      'púšti zamorenej démonmi sa Roland vzoprie pomätenej kazateľke a jej vražedným' +
      ' ovečkám, zoznámi sa s príťažlivou ženou Alice, vedie rozhovor s démonom a ' +
      'napokon sa spriatelí s chlapcom z nášho sveta. Jake Chambers sa pridá k Rolandovi, ' +
      'ale zatiaľ čo pištoľník putuje so svojím mladým spoločníkom, muž v čiernom si odnáša ' +
      'jeho dušu vo vrecku. ';


  }

}
