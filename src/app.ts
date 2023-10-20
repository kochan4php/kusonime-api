/**
 * @description This file contain a method to init express application
 * @description It will connect to database MongoDB and use all middlewares
 * @description It also contain all routes for all endpoints
 * @author {Deo Sbrn}
 */

import cors from 'cors';
import express, { Application } from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import ResponseHelper from './app/helpers/response.helper';
import { corsConfig, helmetConfig, limitterConfig } from './config/app';
import mainRoute from './routes/main.route';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerOption from './config/swagger';

/**
 * @description Init express application
 * @returns {Application} - Express application
 */
export default function init(): Application {
    // * Init express app
    const app: Application = express();

    // * Middlewares
    app.use(helmet(helmetConfig()));
    app.use(cors(corsConfig()));
    app.use(rateLimit(limitterConfig()));
    app.use(morgan('dev'));

    // * Trust proxy
    app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

    // * Swagger
    const swaggerSpec = swaggerJsDoc(swaggerOption);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

    // * Main Route
    app.use('/api', mainRoute);

    // * Default Route
    app.use((_, res) => ResponseHelper.success(res, 200, { message: 'Welcome to Unofficial Kusonime REST API' }));

    // * Return express app
    return app;
}
