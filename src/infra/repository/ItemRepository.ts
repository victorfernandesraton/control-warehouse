import Category from '../../core/entity/Category';
import Item from '../../core/entity/Item';
import Storage from '../../core/entity/Storage';

export default interface ItemRepository {
  createItem(item: Item): Promise<Item | null>;
  find(item: Item): Promise<Item>;
  findByCategory(category: Category): Promise<Item[]>;
  findByStorage(storage: Storage): Promise<Item[]>;
}
