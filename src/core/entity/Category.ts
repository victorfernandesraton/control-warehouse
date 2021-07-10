import BasicEntity from './BasicEntity';

export interface CategoryObjectParams {
  name: string;
  uniqueName: string;
  description?: string;
}

export default class Category extends BasicEntity {
  public name: string;
  public description: string;
  public uniqueName: string;

  constructor({ name, uniqueName, description = '' }: CategoryObjectParams) {
    super();
    this.name = name;
    this.description = description;
    this.uniqueName = uniqueName;
  }
}
