import StorageRepository from '../StorageRepository';
import MongoStorageRepositoy from './StorageRepository';
import { MongoHelperInterface } from '../../database/mongodb';

export interface MongoDBFactoryInterface {
  storage: StorageRepository;
}
export default async function MongoDBFactory(
  helper: MongoHelperInterface
): Promise<MongoDBFactoryInterface> {
  const storage = new MongoStorageRepositoy(
    await helper.getCollection('storage')
  );

  return {
    storage,
  };
}
