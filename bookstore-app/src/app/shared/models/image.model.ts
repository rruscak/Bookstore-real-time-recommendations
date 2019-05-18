export class Image {
  public id: number;
  public name: string;
  public path: string;

  constructor(id: number, name: string, path: string) {
    this.id = id;
    this.name = name;
    this.path = path;
  }
}
