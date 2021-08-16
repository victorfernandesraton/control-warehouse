import Express, { Request, Response, NextFunction } from 'express';

class ServerError extends Error {
  constructor(message: string, readonly statusCode: number = 500) {
    super(message);
  }
}

const App = Express();

App.get('/', (req: Request, res: Response) => res.json({ message: 'OK' }));

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
