/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import StorageCreateController from '../controller/StorageCreateController';
import StorageListController from '../controller/StorageListController';
import StorageFindController from '../controller/StorageFindController';
enum StorageRouterEndpoint {
  create = '/',
  list = '/',
  findOne = '/:id',
}
export function StorageRouterFactory(
  storageCreateController: StorageCreateController,
  storageListConttroller: StorageListController,
  storageFindController: StorageFindController,
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

  router.get(StorageRouterEndpoint.findOne, (...args) => {
    storageFindController.handle(
      storageFindController.controller.extractionHttpData(...args)
    );
  });

  return router;
}
