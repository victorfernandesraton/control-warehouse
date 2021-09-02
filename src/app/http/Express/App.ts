import Express, { Request, Response, NextFunction, Router } from 'express';
import ServerError from './errors/ServerError';
import { StorageRouterFactory } from '../routes/Storage';
import BodyParser from 'body-parser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Application(storageRoute: Router) {
  const App = Express();

  App.use(Express.json());

  App.use(storageRoute);

  App.use((req: Request, res: Response, next: NextFunction) => {
    next(new ServerError('Not found', 404));
  });

  App.use(
    (error: ServerError, req: Request, res: Response, next: NextFunction) => {
      res.status(error?.statusCode ?? 500);
      res.json({ message: error.message });
      return res;
    }
  );

  return App;
}

export default Application;
