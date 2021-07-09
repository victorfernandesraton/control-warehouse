import BasicEntity from "./BasicEntity";

export enum StorageStatusEnum {
  avaliable,
  unavaliable,
  full,
  maintenance,
}

export interface StorageObjectParams {
  name: string;
  description: string;
  status?: StorageStatusEnum;
  capacity?: number;
}

export default class Storage extends BasicEntity {
  name: string;
  description: string;
  status: StorageStatusEnum = StorageStatusEnum.avaliable;
  capacity: number = 100;
  constructor({ name, description, status, capacity }: StorageObjectParams) {
    super();
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
