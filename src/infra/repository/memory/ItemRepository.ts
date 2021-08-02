import ItemAdapter, { ItemObjectParams } from '../../../adapters/Item';
import {
  PaginationEntityAdapterStrategy,
  PaginationEntityOptionsObjectParams,
} from '../../../adapters/PaginationEntity';
import Item from '../../../core/entity/Item';
import PaginationEntity from '../../../shared/utils/PaginationEntity';
import ItemRepository from '../ItemRepository';
export default class ItemRepositoryInMemory implements ItemRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[] = [
    {
      id: '423a3d8c-9d25-492e-82ae-9c1573bc9b3e',
      name: 'Chave de fenda n5',
      description: 'Uma chave de fenda',
      tag: ['chave', 'proteção elétrica'],
      storage: {
        name: 'Caixa de cahevs de fenda',
        status: 0,
        capacity: 10,
        id: '03061a24-7ec5-4f21-9563-3611e27da429',
      },
    },
  ];

  constructor(readonly paginationAdapter: PaginationEntityAdapterStrategy) {}

  createItem(item: ItemObjectParams): Promise<Item> {
    const newItem = ItemAdapter.create(item);
    this.data = [...this.data, newItem];
    return Promise.resolve(newItem);
  }
  find(id: string): Promise<Item> {
    return Promise.resolve(this.data.find((i) => id == i.id));
  }
  findByStorage(id: string): Promise<Item[]> {
    const itens = this.data.filter((item) => id == item.storage.id);
    return Promise.resolve(itens);
  }
  findWithNotIn(
    ids: string[],
    { limit = 5, after }: PaginationEntityOptionsObjectParams
  ): Promise<PaginationEntity<Item>> {
    const items = this.data.filter((item) => !ids.includes(item.id));

    return Promise.resolve(
      this.paginationAdapter.create(items, { after, limit })
    );
  }
}
