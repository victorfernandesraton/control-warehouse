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
}

export default class Storage extends BasicEntity {
  public name: string;
  public description: string;
  public status: StorageStatusEnum = StorageStatusEnum.avaliable;

  constructor({ name, description, status }: StorageObjectParams) {
    super();
    this.name = name;
    this.description = description;
    if (status) {
      this.status = status;
    }
  }
}
