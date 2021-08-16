import { agent } from 'supertest';
import App from '../../../src/app/http/Express/App';

describe('Express server', () => {
  const instance = agent(App);
  test('should be a correct server', async () => {
    const response = await instance.get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('OK');
  });

  test('should be a not found', async () => {
    const response = await instance.get('/notFound404');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Not found');
  });
});
