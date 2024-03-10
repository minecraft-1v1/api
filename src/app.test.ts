import request from 'supertest';

import app from './app';

describe('GET /hello', () => {
  it('responds with a 200 status and the expected body', async () => {
    const response = await request(app).get('/hello');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ data: 'word' });
  });
});