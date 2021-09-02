export default abstract class BaseController {
  protected abstract extractionHttpData(...any: any);

  protected abstract jsonResponse(...any: any);
}

export interface BaseControllerInterface {
  extractionHttpData(...any: any);
  jsonResponse({ code, data }, response);
}
