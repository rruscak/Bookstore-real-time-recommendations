export class Book {
  public id: number;
  public title: string;
  public author: string;
  public imagePath: string;
  public price: number;

  public numOfPages: number;
  public about: string;
  public isbn: string;
  public weight: number;
  public inStock: number;
  public language: string;
  public releaseYear: string;

  constructor(id: number, title: string, author: string, imagePath: string, price: number) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.imagePath = imagePath;
    this.price = price;
  }
}
