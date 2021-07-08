import BasicEntity from "./BasicEntity";

export interface CategoryObjectParams {
  name: string;
  description: string;
}

export default class Category extends BasicEntity {
  public name: string;
  public description: string;

  constructor({ name, description }: CategoryObjectParams) {
    super();
    this.name = name;
    this.description = description;
  }
}
