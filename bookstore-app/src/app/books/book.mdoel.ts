export class Book {
  public id: number;
  public title: string;
  public author: string;
  public imagePath: string;
  public price: number;


  constructor(id: number, title: string, author: string, imagePath: string, price: number) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.imagePath = imagePath;
    this.price = price;
  }
}
