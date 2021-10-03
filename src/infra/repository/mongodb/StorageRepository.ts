import { Collection } from 'mongodb';

import Storage from '../../../core/entity/Storage';
import StorageRepository from '../StorageRepository';
import StorageAdapter from '../../../adapters/Storage';
import PaginationEntity from '../../../shared/utils/PaginationEntity';
import { PaginationEntityMongoDBAdapter } from '../../../adapters/PaginationEntity';

export default class MongoStorageRepositoy implements StorageRepository {
  readonly paginationAdapter: PaginationEntityMongoDBAdapter;
  constructor(readonly collection: Collection) {
    this.paginationAdapter = new PaginationEntityMongoDBAdapter();
  }
  async findAll(
    name?: string,
    afterAt?: number,
    limit?: number
  ): Promise<PaginationEntity<Storage>> {
    try {
      const quryParams: { name?: any; epoch?: any } = {};

      if (name) {
        quryParams.name = { $regex: name, $options: 'i' };
      }
      if (afterAt) {
        quryParams.epoch = { $lte: afterAt };
      }

      const result = (await this.collection
        .find({ ...quryParams })
        .limit(limit)
        .toArray()) as Storage[];

      return this.paginationAdapter.create(result);
    } catch (error) {
      throw new Error('find some crash');
    }
  }
  find(id: string): Promise<Storage> {
    throw new Error('Method not implemented.');
  }
  async createStorage(storage: Storage): Promise<Storage> {
    const item = StorageAdapter.create(storage);
    try {
      await this.collection.insertOne(item);
      return Promise.resolve(item);
    } catch {
      throw new Error('something not created');
    }
  }
  updateStorage(storage: Storage): Promise<Storage> {
    throw new Error('Method not implemented.storage');
  }
}
