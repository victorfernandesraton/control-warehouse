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

  async execute(item: Item): Promise<Item> {
    try {
      const [isValidCategory, storage, isHaveItem, itensByStorage] =
        await Promise.all([
          this.categoryRepository.find(item.category),
          this.storageRepository.find(item.storage),
          this.itemRepository.find(item),
          this.itemRepository.findByCategory(item.category),
        ]);
      if (!isValidCategory) {
        throw new Error(`Category ${item.category.name} is not valid`);
      }

      if (
        !storage ||
        ![StorageStatusEnum.avaliable].includes(storage?.status)
      ) {
        throw new Error("storage is not avaliable");
      }

      if (itensByStorage.length >= storage.capacity) {
        if (storage.status === StorageStatusEnum.avaliable) {
          storage.status = StorageStatusEnum.full;
          await this.storageRepository.updateStorage(storage);
        }
        throw new Error("storage is full");
      }
      if (itensByStorage.length + 1 === storage.capacity) {
        storage.status = StorageStatusEnum.full;
        await this.storageRepository.updateStorage(storage);
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
