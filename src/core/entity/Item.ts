import BasicEntity from './BasicEntity';
import Storage from './Storage';
import { ItemObjectParams } from '../../adapters/Item';
import StorageAdapter from '../../adapters/Storage';
export default class Item extends BasicEntity {
  name: string;
  description?: string;
  tag: string[];
  storage: Storage;

  constructor({ name, description, storage, tag, id }: ItemObjectParams) {
    super(id);
    this.name = name;
    this.description = description;
    this.storage = StorageAdapter.create(storage);
    this.tag = tag;
  }
}
