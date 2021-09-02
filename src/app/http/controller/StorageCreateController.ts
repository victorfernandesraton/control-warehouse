import { BaseControllerInterface } from './BaseController';
import { IApplicationHttpData } from '../../../adapters/Application';
import Storage from '../../../core/entity/Storage';
import CreateStorage from '../../../usecase/CreateStorage';

export default class StorageCreateController {
  readonly createStorage: CreateStorage;
  controller: BaseControllerInterface;
  constructor(
    createStorage: CreateStorage,
    controller: BaseControllerInterface
  ) {
    this.createStorage = createStorage;
    this.controller = controller;
    this.handle.bind(this);
  }

  async handle({
    body,
    response,
    errorParse,
  }: IApplicationHttpData): Promise<Storage> {
    const { name, description } = body;
    if (!name) {
      throw new Error('not have name');
    }
    try {
      const result = await this.createStorage.execute({
        name,
        description,
      });

      return Promise.resolve(
        this.controller.jsonResponse({ code: 200, data: result }, response)
      );
    } catch (error) {
      errorParse(error);
    }
  }
}
