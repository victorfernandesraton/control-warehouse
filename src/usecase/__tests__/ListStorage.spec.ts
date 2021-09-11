import { PaginationEntityAdapterInMemory } from '../../adapters/PaginationEntity';
import StorageAdapter from '../../adapters/Storage';
import StorageRepositoryInMemory from '../../infra/repository/memory/StorageRepositoryInMemory';
import ListStorage from '../ListStorages';

describe('ListStorage', () => {
  const repository = new StorageRepositoryInMemory(
    new PaginationEntityAdapterInMemory()
  );
  const items = [1, 2, 3, 4, 5].map((item) => {
    const result = StorageAdapter.create({ name: `box ${item}` });
    return { ...result };
  });
  repository.data = [...repository.data, ...items];
  const usecase = new ListStorage(repository);
  test('List a simple 2 storages', async () => {
    const result = await usecase.execute({ limit: 2 });
    expect(result.data).toHaveLength(2);
    expect(result.after).toBe(items[0].id);
  });

  test('list using name', async () => {
    const result = await usecase.execute({ name: 'cai', limit: 3 });
    expect(result.data).toHaveLength(1);
    expect(result.after).toBeUndefined();
  });
});
