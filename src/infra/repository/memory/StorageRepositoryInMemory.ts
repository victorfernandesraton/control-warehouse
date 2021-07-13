import Storage from '../../../core/entity/Storage';
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

  find(id: string): Promise<Storage> {
    const data = this.data.find((item) => item.id == id);
    if (data) {
      return Promise.resolve(data);
    }
    return Promise.resolve(null);
  }
  createStorage(storage: Storage): Promise<Storage> {
    this.data.push({ ...storage });
    return Promise.resolve(storage);
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
