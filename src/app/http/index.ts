import Application from '../http/Express/App';
import { createServer } from 'http';
import { MongoHelper } from '../../infra/database/mongodb';
import { Router } from 'express';
import { StorageRoute } from './routes/';

import CreateStorage from '../../usecase/CreateStorage';
import StorageCreateController from './controller/StorageCreateController';
import MongoDBFactory from '../../infra/repository/mongodb/Factory';
import { BaseExpressController } from './Express/Controller';
const start = async () => {
  const uri = 'mongodb://localhost:27017/?readPreference=primary&ssl=false';

  await MongoHelper.connect(uri);
  const router = Router();
  const controller = new BaseExpressController();
  const { storage } = await MongoDBFactory(MongoHelper);
  const createStorage = new CreateStorage({ repository: storage });
  const storageCreateController = new StorageCreateController(
    createStorage,
    controller
  );

  const storageRoute = StorageRoute(storageCreateController, router);
  const route = Router();

  route.use('/storage', storageRoute);

  const Server = createServer(Application(route));
  Server.listen(8000);
};

start();
