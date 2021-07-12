import ItemRepositoryInMemory from '../../infra/repository/memory/ItemRepository';
import StorageRepositoryInMemory from '../../infra/repository/memory/StorageRepositoryInMemory';
import CreateItem from '../CreateItem';
import Item from '../../core/entity/Item';
import Storage from '../../core/entity/Storage';

describe('CreateItem', () => {
  test('shoud be createItem', async () => {
    const itemRepository = new ItemRepositoryInMemory();
    const storageRepository = new StorageRepositoryInMemory();
    const usecase = new CreateItem({
      itemRepository,
      storageRepository,
    });

    const item = new Item({
      name: 'chave de fenda n6',
      storage: new Storage({
        name: 'Caixa de cahevs de fenda',
        status: 0,
        capacity: 10,
        id: '03061a24-7ec5-4f21-9563-3611e27da429',
      }),
    });

    await expect(usecase.execute(item)).resolves.toBe(item);
    expect(itemRepository.data).toHaveLength(2);
  });
  test('should be createItem without using after result', async () => {
    const itemRepository = new ItemRepositoryInMemory();
    const storageRepository = new StorageRepositoryInMemory();
    const usecase = new CreateItem({
      itemRepository,
      storageRepository,
    });

    const item = new Item({
      name: 'chave de fenda n7',
      storage: new Storage({
        name: 'Caixa de cahevs de fenda',
        status: 0,
        capacity: 10,
        id: '03061a24-7ec5-4f21-9563-3611e27da429',
      }),
    });

    await expect(usecase.execute(item)).resolves.toBe(item);
    expect(itemRepository.data).toHaveLength(2);
  });
  test('shoud be not create item because storage is full', async () => {
    const itemRepository = new ItemRepositoryInMemory();
    const storageRepository = new StorageRepositoryInMemory();
    storageRepository.data = [
      ...storageRepository.data,
      {
        id: '53c0ba3d-0258-42c3-9110-ed509e1d51df',
        name: 'caixa de chave philips',
        status: 0,
        capacity: 1,
      },
    ];
    const item = new Item({
      name: 'chave philips n6',
      storage: new Storage({
        id: '53c0ba3d-0258-42c3-9110-ed509e1d51df',
        name: 'caixa de chave philips',
        status: 0,
        capacity: 1,
      }),
    });
    const itemNotCreated = new Item({
      name: 'chave philips n8',
      storage: new Storage({
        id: '53c0ba3d-0258-42c3-9110-ed509e1d51df',
        name: 'caixa de chave philips',
        status: 0,
        capacity: 1,
      }),
    });

    const usecase = new CreateItem({
      itemRepository,
      storageRepository,
    });

    await expect(usecase.execute(item)).resolves.toBe(item);
    expect(itemRepository.data).toHaveLength(2);

    await expect(usecase.execute(itemNotCreated)).rejects.toThrowError(
      'storage is full caixa de chave philips capacity 1 and have 1'
    );
    expect(itemRepository.data).toHaveLength(2);
  });
  test('shoud be not create item because storage is not have capacity', async () => {
    const itemRepository = new ItemRepositoryInMemory();
    const storageRepository = new StorageRepositoryInMemory();
    storageRepository.data = [
      ...storageRepository.data,
      {
        id: '53c0ba3d-0258-42c3-9110-ed509e1d51df',
        name: 'caixa de chave philips',
        status: 0,
        capacity: 0,
      },
    ];
    const item = new Item({
      name: 'chave philips n6',
      storage: new Storage({
        id: '53c0ba3d-0258-42c3-9110-ed509e1d51df',
        name: 'caixa de chave philips',
        status: 0,
        capacity: 1,
      }),
    });

    const usecase = new CreateItem({
      itemRepository,
      storageRepository,
    });

    await expect(usecase.execute(item)).rejects.toThrowError(
      'storage is full caixa de chave philips capacity 0 and have 0'
    );
    expect(itemRepository.data).toHaveLength(1);
  });
});
