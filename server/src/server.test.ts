import request from 'supertest';
import { server, app } from './server';
jest.useFakeTimers();

afterAll(done => {
  server.close(done); // Close the server after all tests
});

describe('POST /fetch-metadata', () => {
  // #1
  it('should return metadata for valid URLs', async () => {
    const response = await request(app)
      .post('/fetch-metadata')
      .send({
        urls: [
          'https://www.example.com',
          'https://www.google.com',
          'https://www.github.com',
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('image');
  });

  // #2
  it('should return error for invalid URLs', async () => {
    const response = await request(app)
      .post('/fetch-metadata')
      .send({
        urls: [
          'https://www.invalidurl12345.com',
          'https://www.example.com',
          'https://www.anotherbadurl98765.com',
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0]).toHaveProperty('error');
    expect(response.body[1]).toHaveProperty('title');
    expect(response.body[2]).toHaveProperty('error');
  });

  // #3
  it('should return 400 if less than 3 URLs are provided', async () => {
    const response = await request(app)
      .post('/fetch-metadata')
      .send({
        urls: ['https://www.example.com', 'https://www.google.com'],
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // #4
  it('should return 400 if URLs are not provided', async () => {
    const response = await request(app).post('/fetch-metadata').send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // #5
  it('should handle rate limiting', async () => {
    // Fast-forward all timers by the limit's window duration
    jest.advanceTimersByTime(1000);

    const requests = Array(6)
      .fill(null)
      .map(() =>
        request(app)
          .post('/fetch-metadata')
          .send({
            urls: [
              'https://www.example.com',
              'https://www.google.com',
              'https://www.github.com',
            ],
          })
      );

    const responses = await Promise.all(requests);

    const statusCodes = responses.map(res => res.status);

    expect(statusCodes.filter(code => code === 200)).toHaveLength(5);
    expect(statusCodes.filter(code => code === 429)).toHaveLength(1);
  });
});
