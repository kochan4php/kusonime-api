import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOption: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Unofficial Kusonime REST API',
            version: '1.0.0',
            description: 'Unofficial Kusonime REST API',
            contact: {
                name: 'Deo Sbrn',
                url: 'https://github.com/kochan4php',
            },
        },

        servers: [
            { url: 'https://brick-red-cricket-gown.cyclic.app', description: 'Production server' },
            { url: 'http://localhost:8000', description: 'Development server' },
        ],
    },
    apis: ['./api-docs/*.yml', './api-docs/*/*.yml'],
};

export default swaggerOption;
