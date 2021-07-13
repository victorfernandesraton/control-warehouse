import Item from '../../core/entity/Item';
import Storage from '../../core/entity/Storage';
import { ItemObjectParams } from '../../adapters/Item';

export default interface ItemRepository {
  createItem(item: ItemObjectParams): Promise<Item | null>;
  find(item: Item): Promise<Item>;
  findByStorage(id: string): Promise<Item[]>;
}
