import { BaseControllerInterface } from './BaseController';
import { IApplicationHttpData } from '../../../adapters/Application';
import Storage from '../../../core/entity/Storage';
import ListStorages from '../../../usecase/ListStorages';

export default class StorageFindController {
  constructor(
    readonly listStorages: ListStorages,
    readonly controller: BaseControllerInterface
  ) {
    this.controller = controller;
    this.handle.bind(this);
  }

  async handle({
    query,
    response,
    errorParse,
  }: IApplicationHttpData): Promise<Storage> {
    const { limit = 0, afterAt = undefined, name = undefined } = query;
    try {
      const result = await this.listStorages.execute({
        name,
        limit: parseInt(limit),
        afterAt: parseInt(afterAt),
      });

      return Promise.resolve(
        this.controller.jsonResponse({ code: 200, data: result }, response)
      );
    } catch (error) {
      errorParse(error);
    }
  }
}
