import swaggerJSDoc from 'swagger-jsdoc';

const localUrl: string = 'http://localhost:8000';
const prodUrl: string = 'https://brick-red-cricket-gown.cyclic.app';
const url: string = process.env.NODE_ENV === 'development' ? localUrl : prodUrl;

const localDescription: string = 'Local server';
const prodDescription: string = 'Production server';
const description: string = process.env.NODE_ENV === 'development' ? localDescription : prodDescription;

const swaggerOption: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Unofficial Kusonime REST API',
            version: '1.0.0',
            description: 'This is an API documentation for Unofficial Kusonime REST API',
            contact: { name: 'kochan4php', url: 'https://github.com/kochan4php' },
        },

        servers: [{ url, description }],
    },
    apis: ['./api-docs/*.yml', './api-docs/*/*.yml'],
};

export default swaggerOption;
