import Express, { Request, Response, NextFunction, Router } from 'express';
import ServerError from './errors/ServerError';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Application(route?: Router) {
  const App = Express();

  App.use(Express.json());

  if (route) {
    App.use(route);
  }

  App.get('/', (req: Request, res: Response) => {
    res.status(200);
    res.json({
      message: 'OK',
    });
  });

  App.use((req: Request, res: Response, next: NextFunction) => {
    next(new ServerError('Not found', 404));
  });

  App.use((error: ServerError, req: Request, res: Response) => {
    res.status(error?.statusCode ?? 500).json({ message: error.getMessage() });
    return res;
  });

  return App;
}

export default Application;
