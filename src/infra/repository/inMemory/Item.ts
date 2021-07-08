import Item from "../../../core/entity/Item";
import ItemRepository from "../ItemRepository";
import InMemoryDb from "./inMemory";

export default class ItemRepositoryInMemory
  extends InMemoryDb<Item>
  implements ItemRepository
{
  createItem(item: Item): Promise<Item> {
    this.store.push(item);
    return Promise.resolve(item);
  }
  find({
    name,
    description,
    id,
    category,
    storage,
    tag,
  }: Item): Promise<Item[]> {
    return Promise.resolve(
      this.store?.filter?.(
        (item) =>
          (item.name === name && item.description === description) ||
          (item.category === category &&
            item.storage == storage &&
            item.tag.some((item) => tag.includes(item))) ||
          item.id === id
      )
    );
  }
}
