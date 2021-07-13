import Item from '../core/entity/Item';
import { StorageStatusEnum } from '../core/entity/Storage';
import ItemRepository from '../infra/repository/ItemRepository';
import StorageRepository from '../infra/repository/StorageRepository';

export interface CreateItemParams {
  itemRepository: ItemRepository;
  storageRepository: StorageRepository;
}
export default class CreateItem {
  itemRepository: ItemRepository;
  storageRepository: StorageRepository;
  constructor({ itemRepository, storageRepository }: CreateItemParams) {
    this.itemRepository = itemRepository;
    this.storageRepository = storageRepository;
  }

  async execute(item: Item): Promise<Item> {
    const [storage, itensByStorage] = await Promise.all([
      this.storageRepository.find(item.storage),
      this.itemRepository.findByStorage(item.storage),
    ]);

    if (!storage || storage.status === undefined || storage.status === null) {
      throw new Error('storage not found');
    }

    if (![StorageStatusEnum.avaliable].includes(storage?.status)) {
      if (storage?.status === StorageStatusEnum.full) {
        throw new Error(
          `storage is full ${storage.name} capacity ${storage.capacity} and have ${itensByStorage.length}`
        );
      } else {
        throw new Error('storage is not avaliable');
      }
    }

    if (itensByStorage.length + 1 > storage.capacity || !storage.capacity) {
      if (storage.status === StorageStatusEnum.avaliable) {
        storage.status = StorageStatusEnum.full;
        await this.storageRepository.updateStorage(storage);
      }
      throw new Error(
        `storage is full ${storage.name} capacity ${storage.capacity} and have ${itensByStorage.length}`
      );
    }

    if (itensByStorage.length + 1 === storage.capacity) {
      storage.status = StorageStatusEnum.full;
      await this.storageRepository.updateStorage(storage);
    }

    const createdItem = await this.itemRepository.createItem(item);

    return createdItem;
  }
}
