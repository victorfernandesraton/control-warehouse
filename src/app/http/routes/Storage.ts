import StorageController from '../controller/StorageController';
import StorageRepository from '../../../infra/repository/mongodb/StorageRepository';
import CreateStorage from '../../../usecase/CreateStorage';

export function StorageMiddleware(req, res, next) {
  const repository = new StorageRepository(
    req.database.db('sys').collection('store')
  );

  req.locals.repository = repository;

  next();
}
