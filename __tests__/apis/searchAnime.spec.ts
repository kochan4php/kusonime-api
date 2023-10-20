import supertest from 'supertest';
import app from '../../__mocks__/app';

describe('Test /api/search/:query endpoint', () => {
    it('should return 200 OK and success get anime seasons', async () => {
        const result = await supertest(app).get('/api/search/highschool%20dxd');

        expect(result.status).not.toBe(500);
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('success', true);
        expect(result.body).toHaveProperty('data');
        expect(result.body.data).toBeInstanceOf(Array);
    });
});
