export interface BaseControllerInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractionHttpData(...any: any);
  jsonResponse({ code, data }, response);
}
