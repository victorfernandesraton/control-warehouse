import Category from '../../core/entity/Category';
import Item from '../../core/entity/Item';
import Storage, { StorageStatusEnum } from '../../core/entity/Storage';
import CategoryRepositoryInMemory from '../../infra/repository/inMemory/Category';
import ItemRepositoryInMemory from '../../infra/repository/inMemory/Item';
import StorageRepositoryInMemory from '../../infra/repository/inMemory/storageRepository';
import CreateItem from '../CreateItem';

describe('CreateItem', () => {
  const categpries = [
    new Category({
      name: 'chave de fenda',
      description: 'conjunto de chaves',
      uniqueName: 'CHAVE_DE_FENDA',
    }),
    new Category({
      name: 'resistor',
      description: 'dispositivio resistivo',
      uniqueName: 'RESISTOR',
    }),
  ];
  const storages = [
    new Storage({ name: 'Caixa 1', description: 'Caixa de ferramentas 1' }),
    new Storage({ name: 'Caixa 2', description: 'Caixa de ferramentas 2' }),
  ];
  const categoryRepository = new CategoryRepositoryInMemory(categpries);
  const storageRepository = new StorageRepositoryInMemory(storages);
  const itemRepository = new ItemRepositoryInMemory();

  beforeEach(() => {
    itemRepository.clearAll();
    categoryRepository.clearAll();
    storageRepository.clearAll();
  });

  describe('created sucessfull', () => {
    test('should be create item', async () => {
      const usecase = new CreateItem({
        categoryRepository,
        itemRepository,
        storageRepository,
      });

      const item = new Item({
        name: 'Chave de fenda n5',
        category: categpries[0],
        storage: storages[0],
        tag: ['cahev de fenda', 'item de eletricista'],
      });

      await expect(usecase.execute(item)).resolves.toEqual(item);

      itemRepository.clearAll();
    });
  });

  describe('Test error storage full', () => {
    test('Shoud not be createItem because storage is full', async () => {
      const usecase = new CreateItem({
        categoryRepository,
        itemRepository,
        storageRepository,
      });

      const storage = new Storage({
        name: 'Caixa de parafusos',
        description: 'Caixa para guardar parafuso',
        capacity: 0,
      });

      await storageRepository.createStorage(storage);

      const item = new Item({
        name: 'Parafuso',
        description: 'Parafuso tamanho n',
        storage,
        category: categpries[0],
      });

      await expect(usecase.execute(item)).rejects.toThrowError(
        `storage (${storage.name}/${storage.id}) not have capacity`
      );
    });
    test('Shoud not be createItem because storage is full previsouly', async () => {
      const usecase = new CreateItem({
        categoryRepository,
        itemRepository: new ItemRepositoryInMemory(), // TODO ajustar sincronia para limnpar elementos
        storageRepository,
      });

      const storage = new Storage({
        name: 'Caixa de parafusos nova',
        description: 'Caixa para guardar parafuso',
        capacity: 1,
      });

      const data = await storageRepository.createStorage(storage);
      expect(data.status).toBe(StorageStatusEnum.avaliable);

      const item1 = new Item({
        name: 'Parafuso 1',
        description: 'Parafuso tamanho n',
        storage,
        category: categpries[0],
      });

      const item2 = new Item({
        name: 'Parafuso 2',
        description: 'Parafuso tamanho n',
        storage,
        category: categpries[0],
      });

      await expect(usecase.execute(item1)).resolves.toEqual(item1);
      await expect(usecase.execute(item2)).rejects.toThrowError('storage is not avaliable');
    });
    test('Shoud not be createItem because storage is unavaliable', async () => {
      const usecase = new CreateItem({
        categoryRepository,
        itemRepository,
        storageRepository,
      });

      const storage = new Storage({
        name: 'Caixa de parafusos',
        description: 'Caixa para guardar parafuso',
        capacity: 1,
        status: StorageStatusEnum.unavaliable,
      });
      await storageRepository.createStorage(storage);

      const item = new Item({
        name: 'Parafuso',
        description: 'Parafuso tamanho n',
        storage,
        category: categpries[0],
      });

      await expect(usecase.execute(item)).rejects.toThrowError(`storage is not avaliable`);
    });

    test('shoud be not create item because category is not valid', async () => {
      const usecase = new CreateItem({
        categoryRepository,
        itemRepository,
        storageRepository,
      });

      const category = new Category({
        name: 'Caixa de chave de rosca',
        description: 'Uma caixa com um monte de chaves',
        uniqueName: 'CHAVE_DE_ROSCA',
      });

      const item = new Item({
        name: 'Parafuso',
        description: 'Parafuso tamanho n',
        storage: storages[0],
        category,
      });
      await expect(usecase.execute(item)).rejects.toThrowError(
        `Category ${category.name} is not valid`
      );
    });
    describe('Error in Item', () => {
      test('shoud be not create item because it is duplicated', async () => {
        const usecase = new CreateItem({
          categoryRepository,
          itemRepository,
          storageRepository,
        });

        const item = new Item({
          name: 'Parafuso',
          description: 'Parafuso tamanho n',
          storage: storages[0],
          category: categpries[0],
        });
        await expect(usecase.execute(item)).resolves.toBe(item);
        await expect(usecase.execute(item)).rejects.toThrowError('item is exist');
      });
    });
  });
});
