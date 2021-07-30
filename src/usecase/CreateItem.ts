import Item from '../core/entity/Item';
import { StorageStatusEnum } from '../core/entity/Storage';
import ItemRepository from '../infra/repository/ItemRepository';
import StorageRepository from '../infra/repository/StorageRepository';
import { ItemObjectParams } from '../adapters/Item';

export interface CreateItemParams {
  itemRepository: ItemRepository;
  storageRepository: StorageRepository;
}

export interface CreateItemExecuteParams {
  item: ItemObjectParams;
  storageId: string;
}

export default class CreateItem {
  readonly itemRepository: ItemRepository;
  readonly storageRepository: StorageRepository;
  constructor({ itemRepository, storageRepository }: CreateItemParams) {
    this.itemRepository = itemRepository;
    this.storageRepository = storageRepository;
  }

  async execute({ item, storageId }: CreateItemExecuteParams): Promise<Item> {
    const [storage, itensByStorage] = await Promise.all([
      this.storageRepository.find(storageId),
      this.itemRepository.findByStorage(storageId),
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

    return await this.itemRepository.createItem({
      ...item,
      storage,
    });
  }
}
