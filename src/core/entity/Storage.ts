import BasicEntity from './BasicEntity';

export interface StorageObjectParams {
  id?: string;
  name: string;
  description?: string;
}

export default class Storage extends BasicEntity {
  name: string;
  description = '';
  constructor({ name, description = '', id }: StorageObjectParams) {
    super(id);
    this.name = name;
    this.description = description;
  }
}
