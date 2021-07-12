import BasicEntity from './BasicEntity';
import Storage from './Storage';
export interface ItemObjectParams {
  id?: string;
  name: string;
  storage: Storage;
  description?: string;
  tag?: string[];
}

export default class Item extends BasicEntity {
  name: string;
  description?: string;
  tag: string[];
  storage: Storage;

  constructor({ name, description, storage, tag, id }: ItemObjectParams) {
    super(id);
    this.name = name;
    this.description = description;
    this.storage = storage;
    this.tag = tag;
  }
}
