import Item from '../../../core/entity/Item';
import Storage from '../../../core/entity/Storage';
import ItemRepository from '../ItemRepository';
export default class ItemRepositoryInMemory implements ItemRepository {
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

  createItem(item: Item): Promise<Item> {
    this.data = [...this.data, item];
    return Promise.resolve(item);
  }
  find(item: Item): Promise<Item> {
    return Promise.resolve(
      new Item({ ...this.data.find((i) => item.id == i.id) })
    );
  }
  findByStorage(storage: Storage): Promise<Item[]> {
    const itens = this.data.filter((item) => storage.id == item.storage.id);
    return Promise.resolve(itens);
  }
}
