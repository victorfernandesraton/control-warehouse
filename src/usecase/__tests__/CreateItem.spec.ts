import { PaginationEntityAdapterInMemory } from '../../adapters/PaginationEntity';
import ItemRepositoryInMemory from '../../infra/repository/memory/ItemRepository';
import StorageRepositoryInMemory from '../../infra/repository/memory/StorageRepositoryInMemory';
import CreateItem from '../CreateItem';

describe('CreateItem', () => {
  test('shoud be createItem', async () => {
    const itemRepository = new ItemRepositoryInMemory(
      new PaginationEntityAdapterInMemory()
    );
    const storageRepository = new StorageRepositoryInMemory();
    const usecase = new CreateItem({
      itemRepository,
      storageRepository,
    });

    const item = {
      name: 'chave de fenda n6',
    };
    const storage = {
      name: 'Caixa de cahevs de fenda',
      status: 0,
      capacity: 10,
      id: '03061a24-7ec5-4f21-9563-3611e27da429',
    };

    const data = await usecase.execute({ item, storageId: storage.id });
    expect(data).toHaveProperty('id');
    expect(data.storage.id).toBe(storage.id);
    expect(itemRepository.data).toHaveLength(2);
  });
  test('should be createItem without using after result', async () => {
    const itemRepository = new ItemRepositoryInMemory(
      new PaginationEntityAdapterInMemory()
    );
    const storageRepository = new StorageRepositoryInMemory();
    const usecase = new CreateItem({
      itemRepository,
      storageRepository,
    });

    const item = {
      name: 'chave de fenda n7',
    };
    const storage = {
      name: 'Caixa de cahevs de fenda',
      status: 0,
      capacity: 10,
      id: '03061a24-7ec5-4f21-9563-3611e27da429',
    };

    const data = await usecase.execute({ item, storageId: storage.id });
    expect(data).toHaveProperty('id');
    expect(data.storage.id).toBe(storage.id);
    expect(itemRepository.data).toHaveLength(2);
  });
  test('shoud be not create item because storage is not found', async () => {
    const itemRepository = new ItemRepositoryInMemory(
      new PaginationEntityAdapterInMemory()
    );
    const storageRepository = new StorageRepositoryInMemory();

    const item = {
      name: 'resistor de 5Ohms',
    };
    const storage = {
      id: '1c651103-886f-477-',
      name: 'caixa de resistores',
    };

    const usecase = new CreateItem({
      itemRepository,
      storageRepository,
    });

    await expect(
      usecase.execute({ item, storageId: storage.id })
    ).rejects.toThrowError('storage not found');

    expect(itemRepository.data).toHaveLength(1);
  });
});
