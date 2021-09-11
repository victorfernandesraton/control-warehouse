import Storage from '../core/entity/Storage';
import StorageRepository from '../infra/repository/StorageRepository';
import PaginationEntity from '../shared/utils/PaginationEntity';

export interface ListStorageParams {
  name?: string;
  limit?: number;
  afterAt?: number;
}

export default class ListStorage {
  constructor(readonly repository: StorageRepository) {}

  async execute({
    name,
    limit,
    afterAt,
  }: ListStorageParams): Promise<PaginationEntity<Storage>> {
    try {
      const result = await this.repository.findAll(name, afterAt, limit);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
