import { Request, Response, NextFunction } from 'express';
import { IApplicationHttpData } from '../../../adapters/Application';
import { BaseControllerInterface } from '../controller/BaseController';

export class BaseExpressController implements BaseControllerInterface {
  public extractionHttpData(
    req: Request,
    response: Response,
    next: NextFunction
  ): IApplicationHttpData {
    const { params, body, query } = req;
    return { params, body, query, response, errorParse: next };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public jsonResponse({ code, data }, response: Response) {
    return response.status(code).json(data);
  }
}
