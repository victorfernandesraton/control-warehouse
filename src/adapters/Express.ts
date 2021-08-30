import { Request, Response } from 'express';
import { IApplicationHttpData } from './Application';
function extractionHttpData(req: Request): IApplicationHttpData {
  const { params, body, query } = req;
  const database = req.app.locals?.database;
  return { params, body, query, database };
}

export default class ExpressAdapter {
  static parse(fn: any) {
    return async function (req: Request, res: Response): Promise<any> {
      const result = await fn(extractionHttpData(req));

      res.json(result);
    };
  }
}
