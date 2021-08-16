import Express, { Request, Response, NextFunction } from 'express';
import ExpressAdapter from '../../../adapters/Express';
import ServerError from './errors/ServerError';

import BodyParser from 'body-parser';

const App = Express();

App.use(Express.json());

const defaultHandler = () => ({ message: 'OK' });

App.get('/', ExpressAdapter.parse(defaultHandler));
App.post(
  '/',
  ExpressAdapter.parse(({ body, params, query }) => {
    const IMC = body.peso / (body.altura / 100) ** 2;
    return { IMC, body, params, query };
  })
);

App.get(
  '/user/:idx',
  ExpressAdapter.parse(({ params, body, query }) => {
    return { params, body, query };
  })
);

App.use((req: Request, res: Response, next: NextFunction) => {
  next(new ServerError('Not found', 404));
});

App.use(
  (error: ServerError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode);
    res.json({ message: error.message });
    return res;
  }
);

export default App;
