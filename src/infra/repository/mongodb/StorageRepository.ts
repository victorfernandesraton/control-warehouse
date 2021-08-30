import { Collection } from 'mongodb';

import Storage from '../../../core/entity/Storage';
import Storagerepository from '../StorageRepository';
import StorageAdapter from '../../../adapters/Storage';

export default class MongoStorageRepositoy implements Storagerepository {
  constructor(readonly collection: Collection) {}
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
    throw new Error('Method not implemented.');
  }
}
