import Storage from '../core/entity/Storage';
import StorageAdapter from '../adapters/Storage';
import StorageRepository from '../infra/repository/StorageRepository';

export interface CreateStorageParams {
  repository: StorageRepository;
}

export interface CreateStorageExecuteParams {
  name: string;
  description?: string;
}

export default class CreateStorage {
  readonly repository: StorageRepository;
  constructor({ repository }: CreateStorageParams) {
    this.repository = repository;
  }

  async execute({
    name,
    description,
  }: CreateStorageExecuteParams): Promise<Storage> {
    const storage = StorageAdapter.create({ name, description });

    const result = await this.repository.createStorage(storage);

    return Promise.resolve(storage);
  }
}
