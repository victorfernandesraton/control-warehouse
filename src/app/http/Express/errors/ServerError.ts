export default class ServerError extends Error {
  constructor(message: string, readonly statusCode: number = 500) {
    super(message);
  }
}
