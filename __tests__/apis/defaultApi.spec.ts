import supertest from "supertest"
import app from "../../__mocks__/app"

describe('Test default api', () => {
    it('should return 200 OK', async () => {
        const resultMain = await supertest(app).get('/');
        const resultNotFound = await supertest(app).get('/xmklasxmsa');

        expect(resultMain.status).toBe(200);
        expect(resultMain.body).toHaveProperty('success', true);
        expect(resultMain.body).toHaveProperty('data');
        expect(resultMain.body.data).toHaveProperty('message');
        expect(resultMain.body.data.message).toBe('Welcome to Unofficial Kusonime REST API');
        
        expect(resultNotFound.status).toBe(200);
        expect(resultNotFound.body).toHaveProperty('success', true);
        expect(resultNotFound.body).toHaveProperty('data');
        expect(resultNotFound.body.data).toHaveProperty('message');
        expect(resultNotFound.body.data.message).toBe('Welcome to Unofficial Kusonime REST API');
    })
})