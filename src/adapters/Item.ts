import Item, { ItemObjectParams } from '../core/entity/Item';

export default class ItemAdapter {
  create({ id, name, description, storage, tag }: ItemObjectParams): Item {
    return new Item({ id, name, description, tag, storage });
  }
}
