import Item from '../../core/entity/Item';
import { ItemObjectParams } from '../../adapters/Item';

export default interface ItemRepository {
  createItem(item: ItemObjectParams): Promise<Item | null>;
  find(id: string): Promise<Item>;
  findByStorage(id: string): Promise<Item[]>;
}
