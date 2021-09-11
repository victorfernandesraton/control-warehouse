/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import StorageCreateController from '../controller/StorageCreateController';

enum StorageRouterEndpoint {
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
