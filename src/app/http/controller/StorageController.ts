import Storage from '../../../core/entity/Storage';
import CreateStorage from '../../../usecase/CreateStorage';

export default class StorageController {
  createStorageUseCase: CreateStorage;
  constructor(createStorageUseCase: CreateStorage) {
    this.createStorageUseCase = createStorageUseCase;
  }

  async createStorage({ body, database }): Promise<Storage> {
    const { name, description } = body;
    if (!name) {
      throw new Error('not have name');
    }
    const result = await this.createStorageUseCase.execute({
      name,
      description,
    });

    return Promise.resolve(result);
  }
}
