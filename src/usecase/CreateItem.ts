import Item from '../core/entity/Item';

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
    const [storage] = await Promise.all([
      this.storageRepository.find(storageId),
    ]);

    if (!storage) {
      throw new Error('storage not found');
    }

    return await this.itemRepository.createItem({
      ...item,
      storage,
    });
  }
}
