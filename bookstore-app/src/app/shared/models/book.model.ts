import { Image } from './image.model';

export class Book {
  public id: number;
  public title: string;
  public price: number;

  public writer: string;
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
  public rating: number;

  public quantity: number;

  public images: Image[];

  constructor(id: number, title: string, writer: string, image: Image, price: number) {
    this.id = id;
    this.title = title;
    this.writer = writer;
    this.price = price;
    this.images = [image];
  }
}
