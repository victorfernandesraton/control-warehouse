import { PaginationEntityAdapterInMemory } from '../../adapters/PaginationEntity';
import StorageRepositoryInMemory from '../../infra/repository/memory/StorageRepositoryInMemory';
import CreateStorage from '../CreateStorage';

describe('createStorage', () => {
  const storageRepository = new StorageRepositoryInMemory(
    new PaginationEntityAdapterInMemory()
  );
  const usecase = new CreateStorage({
    repository: storageRepository,
  });

  test('shoud be create a simple storage', async () => {
    const result = await usecase.execute({
      name: 'Simple storage',
      description: 'A simple storage',
    });
    expect(result.name).toBe('Simple storage');
    expect(result.epoch).toBeDefined();
  });
});
