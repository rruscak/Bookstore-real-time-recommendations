export class Genre {
  id: number;
  name: string;
  categories: {
    id: number,
    name: string
  }[] = [];


  constructor(id: number, name: string, categories: { id: number; name: string }[]) {
    this.id = id;
    this.name = name;
    this.categories = categories;
  }
}
