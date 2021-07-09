import Category from "../../../core/entity/Category";
import Item from "../../../core/entity/Item";
import ItemRepository from "../ItemRepository";
import InMemoryDb from "./inMemory";

export default class ItemRepositoryInMemory
  extends InMemoryDb<Item>
  implements ItemRepository
{
  findByCategory({ name, id }: Category): Promise<Item[]> {
    return Promise.resolve(
      this.store.filter(
        (item: Item) => item.category.name === name || item.category.id === id
      )
    );
  }
  createItem(item: Item): Promise<Item> {
    this.store.push(item);
    return Promise.resolve(item);
  }

  find({ id }: Item): Promise<Item[]> {
    return Promise.resolve(this.store?.filter?.((item) => item.id === id));
  }
}
