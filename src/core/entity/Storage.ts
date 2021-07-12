import BasicEntity from './BasicEntity';

export enum StorageStatusEnum {
  avaliable,
  unavaliable,
  full,
  maintenance,
}

export interface StorageObjectParams {
  id?: string;
  name: string;
  description?: string;
  status?: StorageStatusEnum;
  capacity?: number;
}

export default class Storage extends BasicEntity {
  name: string;
  description = '';
  status: StorageStatusEnum = StorageStatusEnum.avaliable;
  capacity = 100;
  constructor({
    name,
    description = '',
    status,
    capacity,
    id,
  }: StorageObjectParams) {
    super(id);
    this.name = name;
    this.description = description;
    if (status) {
      this.status = status;
    }
    if (capacity || capacity == 0) {
      this.capacity = capacity;
    }
  }
}
