import { agent } from 'supertest';
import Application from '../../../src/app/http/Express/App';

describe('Express server', () => {
  const instance = agent(Application());
  test('should be a correct server', async () => {
    const response = await instance.get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('OK');
  });

  test('should be a not found', async () => {
    const response = await instance.get('/notFound404');
    expect(response.statusCode).toBe(404);
    console.log(response.body);
    // expect(response.body.message).toBe('Not found');
  });
});
