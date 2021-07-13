import ItemRepositoryInMemory from '../../infra/repository/memory/ItemRepository';
import StorageRepositoryInMemory from '../../infra/repository/memory/StorageRepositoryInMemory';
import CreateItem from '../CreateItem';
import { StorageStatusEnum } from '../../core/entity/Storage';

describe('CreateItem', () => {
  test('shoud be createItem', async () => {
    const itemRepository = new ItemRepositoryInMemory();
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
    const itemRepository = new ItemRepositoryInMemory();
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
  test('shoud be not create item because storage is full', async () => {
    const itemRepository = new ItemRepositoryInMemory();
    const storageRepository = new StorageRepositoryInMemory();
    const storage = {
      id: '53c0ba3d-0258-42c3-9110-ed509e1d51df',
      name: 'caixa de chave philips',
      status: 0,
      capacity: 1,
    };
    storageRepository.data = [...storageRepository.data, storage];
    const item = {
      name: 'chave philips n6',
    };
    const itemNotCreated = {
      name: 'chave philips n8',
    };

    const usecase = new CreateItem({
      itemRepository,
      storageRepository,
    });
    const data = await usecase.execute({ item, storageId: storage.id });
    expect(data).toHaveProperty('id');
    expect(data.storage.id).toBe(storage.id);
    expect(itemRepository.data).toHaveLength(2);

    await expect(
      usecase.execute({ item: itemNotCreated, storageId: storage.id })
    ).rejects.toThrowError(
      'storage is full caixa de chave philips capacity 1 and have 1'
    );
    expect(itemRepository.data).toHaveLength(2);
  });
  test('shoud be not create item because storage is not have capacity', async () => {
    const itemRepository = new ItemRepositoryInMemory();
    const storageRepository = new StorageRepositoryInMemory();
    const storage = {
      id: '53c0ba3d-0258-42c3-9110-ed509e1d51df',
      name: 'caixa de chave philips',
      status: 0,
      capacity: 0,
    };
    storageRepository.data = [...storageRepository.data, storage];
    const item = {
      name: 'chave philips n6',
    };

    const usecase = new CreateItem({
      itemRepository,
      storageRepository,
    });

    await expect(
      usecase.execute({ item, storageId: storage.id })
    ).rejects.toThrowError(
      'storage is full caixa de chave philips capacity 0 and have 0'
    );
    expect(itemRepository.data).toHaveLength(1);
  });

  test('shoud be not create item because storage is unvaliable', async () => {
    const itemRepository = new ItemRepositoryInMemory();
    const storageRepository = new StorageRepositoryInMemory();
    const storage = {
      id: '1c651103-886f-4775-a725-0bf9de232cc8',
      name: 'caixa de resistores',
      status: StorageStatusEnum.unavaliable,
      capacity: 10,
    };
    storageRepository.data = [...storageRepository.data, storage];
    const item = {
      name: 'resistor de 5Ohms',
    };
    const usecase = new CreateItem({
      itemRepository,
      storageRepository,
    });

    await expect(
      usecase.execute({ item, storageId: storage.id })
    ).rejects.toThrowError('storage is not avaliable');

    expect(itemRepository.data).toHaveLength(1);
  });
  test('shoud be not create item because storage is not found', async () => {
    const itemRepository = new ItemRepositoryInMemory();
    const storageRepository = new StorageRepositoryInMemory();

    const item = {
      name: 'resistor de 5Ohms',
    };
    const storage = {
      id: '1c651103-886f-477-',
      name: 'caixa de resistores',
      status: StorageStatusEnum.unavaliable,
      capacity: 10,
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
