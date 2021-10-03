import { BaseControllerInterface } from './BaseController';
import { IApplicationHttpData } from '../../../adapters/Application';
import Storage from '../../../core/entity/Storage';
import FindStorageById from '../../../usecase/FindeStorageById';

export default class StorageFindController {
  constructor(
    readonly findstorageById: FindStorageById,
    readonly controller: BaseControllerInterface
  ) {
    this.controller = controller;
    this.handle.bind(this);
  }

  async handle({
    params,
    response,
    errorParse,
  }: IApplicationHttpData): Promise<Storage> {
    const { id = undefined } = params;
    if (!id) {
      throw new Error('not pass id');
    }
    try {
      const result = await this.findstorageById.execute({ id });

      return Promise.resolve(
        this.controller.jsonResponse({ code: 200, data: result }, response)
      );
    } catch (error) {
      errorParse(error);
    }
  }
}
