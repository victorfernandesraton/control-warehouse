import Item from "../core/entity/Item";
import { StorageStatusEnum } from "../core/entity/Storage";
import CategoryRepository from "../infra/repository/CategoryRepository";
import ItemRepository from "../infra/repository/ItemRepository";
import StorageRepository from "../infra/repository/StorageRepository";

export interface CreateItemParams {
  itemRepository: ItemRepository;
  categoryRepository: CategoryRepository;
  storageRepository: StorageRepository;
}
export default class CreateItem {
  itemRepository: ItemRepository;
  categoryRepository: CategoryRepository;
  storageRepository: StorageRepository;
  constructor({
    itemRepository,
    categoryRepository,
    storageRepository,
  }: CreateItemParams) {
    this.itemRepository = itemRepository;
    this.categoryRepository = categoryRepository;
    this.storageRepository = storageRepository;
  }

  async excute(item: Item): Promise<Item> {
    try {
      const [isValidCategory, storage, isHaveItem] = await Promise.all([
        this.categoryRepository.find(item.category),
        this.storageRepository.find(item.storage),
        this.itemRepository.find(item),
      ]);
      if (!isValidCategory) {
        throw new Error(`Category ${item.category.name} is not valid`);
      }
      if (
        !storage?.length ||
        ![StorageStatusEnum.avaliable].includes(storage?.[0]?.status)
      ) {
        throw new Error("storage is not avaliable");
      }
      if (isHaveItem.length) {
        throw new Error("item is exist");
      }
      const createdItem = await this.itemRepository.createItem(item);

      return createdItem;
    } catch (error) {
      throw error;
    }
  }
}
