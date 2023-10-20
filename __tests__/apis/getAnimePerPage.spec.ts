import supertest from 'supertest';
import app from '../../__mocks__/app';

describe('Test /api/page/:page endpoint', () => {
    it('should return 200 OK and success get anime with pagination', async () => {
        const result = await supertest(app).get('/api/page/1');

        expect(result.status).not.toBe(500);
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('success', true);
        expect(result.body).toHaveProperty('data');
        expect(result.body.data).toHaveProperty('anime');
        expect(result.body.data).toHaveProperty('pagination');
        expect(result.body.data.anime).toBeInstanceOf(Array);
        expect(result.body.data.pagination).toBeInstanceOf(Object);
        expect(result.body.data.pagination).toHaveProperty('first_page_endpoint');
        expect(result.body.data.pagination).toHaveProperty('next_page_endpoint');
        expect(result.body.data.pagination).toHaveProperty('current_page');
        expect(result.body.data.pagination).toHaveProperty('pages_of');
        expect(result.body.data.pagination).toHaveProperty('total_page');
        expect(result.body.data.pagination).toHaveProperty('prev_page_endpoint');
        expect(result.body.data.pagination).toHaveProperty('last_page_endpoint');
    });
});
