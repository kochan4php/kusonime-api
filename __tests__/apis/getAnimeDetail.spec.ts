import supertest from 'supertest';
import app from '../../__mocks__/app';

describe('Test /api/anime/:slug endpoint', () => {
    it('should return 200 OK and success get detail anime by slug', async () => {
        const result = await supertest(app).get('/api/anime/jjk-s2-subtitle-indonesia');

        expect(result.status).not.toBe(500);
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('success', true);
        expect(result.body).toHaveProperty('data');
        expect(result.body.data).toHaveProperty('title');
        expect(result.body.data).toHaveProperty('japanese');
        expect(result.body.data).toHaveProperty('image');
        expect(result.body.data).toHaveProperty('producer');
        expect(result.body.data).toHaveProperty('type');
        expect(result.body.data).toHaveProperty('status');
        expect(result.body.data).toHaveProperty('total_episode');
        expect(result.body.data).toHaveProperty('score');
        expect(result.body.data).toHaveProperty('duration');
        expect(result.body.data).toHaveProperty('release_on');
        expect(result.body.data).toHaveProperty('synopsis');
        expect(result.body.data).toHaveProperty('genre');
        expect(result.body.data).toHaveProperty('season');
        expect(result.body.data).toHaveProperty('download');
        expect(result.body.data.genre).toBeInstanceOf(Array);
        expect(result.body.data.season).toBeInstanceOf(Object);
        expect(result.body.data.download).toBeInstanceOf(Array);
    });
});
