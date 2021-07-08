import BasicEntity from "./BasicEntity";
import Category from "./Category";
import Storage from "./Storage";
export interface ItemObjectParams {
  name: string;
  description?: string;
  category: Category;
  storage: Storage;
  tag?: string[];
}

export default class Item extends BasicEntity {
  public name: string;
  public description?: string;
  public storage: Storage;
  public category: Category;
  public tag: string[];

  constructor({ name, description, storage, tag, category }: ItemObjectParams) {
    super();
    this.name = name;
    this.description = description;
    this.category = category;
    this.storage = storage;
    this.tag = tag;
  }
}
