import Storage from '../core/entity/Storage';
import StorageRepository from '../infra/repository/StorageRepository';

export interface FindStorageByIdParams {
  id: string;
}
export default class FindStorageById {
  constructor(readonly repository: StorageRepository) {}

  async execute({ id }: FindStorageByIdParams): Promise<Storage> {
    try {
      const item = await this.repository.find(id);
      return Promise.resolve(item);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
