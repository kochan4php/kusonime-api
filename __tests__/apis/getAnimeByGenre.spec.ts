import supertest from 'supertest';
import app from '../../__mocks__/app';

describe('Test /api/genres/:genre/page/:page endpoint', () => {
    it('should return 200 OK and success get anime by genre', async () => {
        const result = await supertest(app).get('/api/genres/action/page/1');

        expect(result.status).not.toBe(500);
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('success', true);
        expect(result.body).toHaveProperty('data');
        expect(result.body.data).toBeInstanceOf(Array);
    });
});
