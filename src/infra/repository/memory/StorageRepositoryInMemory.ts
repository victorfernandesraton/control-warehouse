import Storage from '../../../core/entity/Storage';
import StorageRepository from '../StorageRepository';
export default class StorageRepositoryInMemory implements StorageRepository {
  data: any[] = [
    {
      name: 'Caixa de cahevs de fenda',
      status: 0,
      capacity: 10,
      id: '03061a24-7ec5-4f21-9563-3611e27da429',
    },
  ];

  find(storage: Storage): Promise<Storage> {
    return Promise.resolve(
      new Storage({ ...this.data.find((item) => item.id === storage.id) })
    );
  }
  createStorage(storage: Storage): Promise<Storage> {
    this.data.push({ ...storage });
    return Promise.resolve(storage);
  }
  async updateStorage(storage: Storage): Promise<Storage> {
    const newStorage = await this.find(storage);
    this.data.filter((item) => item.id !== storage?.id);
    this.data.push({ ...storage });
    return Promise.resolve(newStorage);
  }
}
