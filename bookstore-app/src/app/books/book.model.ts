import { Image } from '../shared/image.model';

export class Book {
  public id: number;
  public title: string;
  public price: number;

  public author: string;
  public publisher: string;
  public category: string;
  public genre: string;

  public numOfPages: number;
  public about: string;
  public isbn: string;
  public weight: number;
  public inStock: number;
  public language: string;
  public releaseYear: string;

  public images: Image[];

  constructor(id: number, title: string, author: string, image: Image, price: number) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.price = price;
    this.images = [image];
  }
}
