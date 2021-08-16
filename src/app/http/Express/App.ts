import Express, { Request, Response, NextFunction } from 'express';
import ExpressAdapter from '../../../adapters/Express';
import ServerError from './errors/ServerError';

const App = Express();

const defaultHandler = () => ({ message: 'OK' });

App.get('/', ExpressAdapter.parse(defaultHandler));

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
