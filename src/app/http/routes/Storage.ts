/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import StorageCreateController from '../controller/StorageCreateController';
import StorageListController from '../controller/StorageListController';

enum StorageRouterEndpoint {
  create = '/',
  list = '/',
}
export function StorageRouterFactory(
  storageCreateController: StorageCreateController,
  storageListConttroller: StorageListController,
  router: any
): any {
  router.post(StorageRouterEndpoint.create, (...args) => {
    storageCreateController.handle(
      storageCreateController.controller.extractionHttpData(...args)
    );
  });

  router.get(StorageRouterEndpoint.list, (...args) => {
    storageListConttroller.handle(
      storageListConttroller.controller.extractionHttpData(...args)
    );
  });

  return router;
}
