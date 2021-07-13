import Storage from '../core/entity/Storage';
import { StorageStatusEnum } from '../core/entity/Storage';
export interface CreateStorageParams {
  id?: string;
  name: string;
  description?: string;
  status?: StorageStatusEnum;
  capacity?: number;
}

export default class StorageAdapter {
  static create({
    id,
    name,
    description,
    status,
    capacity,
  }: CreateStorageParams): Storage {
    return new Storage({
      id,
      name,
      description,
      status,
      capacity,
    });
  }
}
