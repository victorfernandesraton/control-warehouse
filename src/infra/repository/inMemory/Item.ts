import Category from '../../../core/entity/Category';
import Item from '../../../core/entity/Item';
import Storage from '../../../core/entity/Storage';
import ItemRepository from '../ItemRepository';
import InMemoryDb from './inMemory';
import { items } from './__fake__/index';

export default class ItemRepositoryInMemory extends InMemoryDb<Item> implements ItemRepository {
  constructor(list: Item[] = []) {
    super([...items, ...list]);
  }
  findByCategory({ id }: Category): Promise<Item[]> {
    return Promise.resolve(this.store.filter((item: Item) => item.category.id === id));
  }
  findByStorage({ id }: Storage): Promise<Item[]> {
    return Promise.resolve(this.store.filter((item: Item) => item.storage.id === id));
  }
  createItem(item: Item): Promise<Item> {
    this.store.push(item);
    return Promise.resolve(item);
  }

  find({ id }: Item): Promise<Item> {
    return Promise.resolve(this.store?.find?.((item) => item.id === id));
  }
}
