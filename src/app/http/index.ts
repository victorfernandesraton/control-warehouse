import App from '../http/Express/App';
import { createServer } from 'http';
import mongodb from '../../infra/database/mongodb';

const start = async () => {
  const database = await mongodb();

  database.db('sys').collection('storage');
  // ele passa database
  App.locals.database = database;

  const Server = createServer(App);
  Server.listen(8000);
};

start();
