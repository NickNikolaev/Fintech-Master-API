const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const config = require('../../src/config/config');

describe('Auth routes', () => {
  describe('GET /core/docs', () => {
    test('should return 404 when running in production', async () => {
      config.env = 'production';
      await request(app).get('/core/docs').send().expect(httpStatus.NOT_FOUND);
      config.env = process.env.NODE_ENV;
    });
  });
});
