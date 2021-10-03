import FindStorageById from '../FindeStorageById';
import StorageRepository from '../../infra/repository/StorageRepository';
import Storage from '../../core/entity/Storage';
import PaginationEntity from '../../shared/utils/PaginationEntity';

class StorageRepositoryStub implements StorageRepository {
  find(id: string): Promise<Storage> {
    throw new Error('Method not implemented.');
  }
  findAll(
    name?: string,
    afterAt?: number,
    limit?: number
  ): Promise<PaginationEntity<Storage>> {
    throw new Error('Method not implemented.');
  }
  createStorage(storage: Storage): Promise<Storage> {
    throw new Error('Method not implemented.');
  }
  updateStorage(storage: Storage): Promise<Storage> {
    throw new Error('Method not implemented.');
  }
}

describe('FindStorageBtId', () => {
  describe('Shoud be a simple item storage', () => {
    const repository = new StorageRepositoryStub();
    jest.spyOn(repository, 'find').mockImplementation(() =>
      Promise.resolve(
        new Storage({
          name: 'um storage',
          description: 'ok',
        })
      )
    );

    const usecase = new FindStorageById(repository);
    test('should be nto have error', async () => {
      const result = await usecase.execute({ id: 'stub' });
      expect(result).toHaveProperty('name', 'um storage');
      expect(result).toHaveProperty('epoch');
    });
  });
  describe('Shoud not have any item', () => {
    const repository = new StorageRepositoryStub();
    jest
      .spyOn(repository, 'find')
      .mockImplementation(() => Promise.reject(new Error('not found')));

    const usecase = new FindStorageById(repository);
    test('should be nto have error', () => {
      expect(() => usecase.execute({ id: 'stubs' })).rejects.toThrow();
    });
  });
});
