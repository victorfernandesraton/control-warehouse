import Item from '../core/entity/Item';
import StorageAdapter, { CreateStorageParams } from './Storage';

export interface ItemObjectParams {
  id?: string;
  name: string;
  storage?: CreateStorageParams;
  description?: string;
  tag?: string[];
}

export default class ItemAdapter {
  static create({
    id,
    name,
    description,
    storage,
    tag,
  }: ItemObjectParams): Item {
    return new Item({
      id,
      name,
      description,
      tag,
      storage: StorageAdapter.create(storage),
    });
  }
}
