import { PaginationEntityAdapterStrategy } from '../../../adapters/PaginationEntity';
import StorageAdapter from '../../../adapters/Storage';
import Storage, { StorageObjectParams } from '../../../core/entity/Storage';
import PaginationEntity from '../../../shared/utils/PaginationEntity';
import StorageRepository from '../StorageRepository';
export default class StorageRepositoryInMemory implements StorageRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[] = [
    {
      name: 'Caixa de cahevs de fenda',
      status: 0,
      capacity: 10,
      id: '03061a24-7ec5-4f21-9563-3611e27da429',
    },
  ];

  constructor(readonly paginationAdapter: PaginationEntityAdapterStrategy) {}

  find(id: string): Promise<Storage> {
    const data = this.data.find((item) => item.id == id);
    if (data) {
      return Promise.resolve(data);
    }
    return Promise.resolve(null);
  }
  createStorage({ name, description }: StorageObjectParams): Promise<Storage> {
    const newStorage = StorageAdapter.create({
      name,
      description,
    });
    this.data.push(newStorage);
    return Promise.resolve(newStorage);
  }
  findAll(
    name?: string,
    afterAt?: number,
    limit?: number
  ): Promise<PaginationEntity<Storage>> {
    const storages = this.data.filter((item: StorageObjectParams) => {
      if (name) {
        return item.name.toLowerCase().includes(name.toLowerCase());
      }
      return item;
    });

    return Promise.resolve(
      this.paginationAdapter.create(storages, {
        after: afterAt ? afterAt.toString() : null,
        limit,
      })
    );
  }
  async updateStorage(storage: Storage): Promise<Storage> {
    const newStorage = await this.find(storage.id);
    if (newStorage) {
      this.data.filter((item) => item.id !== storage?.id);
      this.data.push({ ...storage });
    }
    return Promise.resolve(newStorage);
  }
}
