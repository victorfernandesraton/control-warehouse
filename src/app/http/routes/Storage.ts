import StorageCreateController from '../controller/StorageCreateController';

export enum StorageRouterEndpoint {
  create = '/',
}
export function StorageRouterFactory(
  storageCreateController: StorageCreateController,
  router: any
): any {
  router.post(StorageRouterEndpoint.create, (...args) => {
    storageCreateController.handle(
      storageCreateController.controller.extractionHttpData(...args)
    );
  });

  return router;
}
