import Application from '../http/Express/App';
import { createServer } from 'http';
import { MongoHelper } from '../../infra/database/mongodb';
import { Router } from 'express';
import { StorageRoute } from './routes/';

import CreateStorage from '../../usecase/CreateStorage';
import ListStorage from '../../usecase/ListStorages';

import StorageCreateController from './controller/StorageCreateController';
import MongoDBFactory from '../../infra/repository/mongodb/Factory';
import { BaseExpressController } from './Express/Controller';
import StorageListConttroller from './controller/StorageListController';
const start = async () => {
  const uri = process.env.MONGODB_HOST;

  try {
    await MongoHelper.connect(uri);
    const router = Router();
    const controller = new BaseExpressController();
    const { storage } = await MongoDBFactory(MongoHelper);
    const createStorage = new CreateStorage({ repository: storage });
    const listStorage = new ListStorage(storage);
    const storageCreateController = new StorageCreateController(
      createStorage,
      controller
    );

    const storageListConttroller = new StorageListConttroller(
      listStorage,
      controller
    );

    const storageRoute = StorageRoute(
      storageCreateController,
      storageListConttroller,
      router
    );

    const route = Router();

    route.use('/storage', storageRoute);

    const Server = createServer(Application(route));
    Server.listen(process.env.PORT);
    Server.on('listening', () => {
      console.info('Server is runing...');
      console.info(process.env.PORT);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
