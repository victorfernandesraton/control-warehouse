import Storage from '../core/entity/Storage';
export interface CreateStorageParams {
  id?: string;
  name: string;
  description?: string;
}

export default class StorageAdapter {
  static create({ id, name, description }: CreateStorageParams): Storage {
    return new Storage({
      id,
      name,
      description,
    });
  }
}
