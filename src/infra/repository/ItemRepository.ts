import Item from '../../core/entity/Item';
import Storage from '../../core/entity/Storage';

export default interface ItemRepository {
  createItem(item: Item): Promise<Item | null>;
  find(item: Item): Promise<Item>;
  findByStorage(storage: Storage): Promise<Item[]>;
}
