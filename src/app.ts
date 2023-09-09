/**
 * @description This file contain a method to init express application
 * @description It will connect to database MongoDB and use all middlewares
 * @description It also contain all routes for all endpoints
 * @author {Deo Sbrn}
 */

import cors from 'cors';
import express, { Application } from 'express';
import { rateLimit } from 'express-rate-limit';
import morgan from 'morgan';
import { corsConfig, limitterConfig } from './config/app';
import mainRoute from './routes/main.route';
import ResponseHelper from './app/helpers/response.helper';

/**
 * @description Init express application
 * @returns {Application} - Express application
 */
const init = function (): Application {
    // * Init express app
    const app: Application = express();

    // * Connect to database

    // * Middlewares
    app.use(cors(corsConfig()));
    app.use(rateLimit(limitterConfig()));
    app.use(morgan('dev'));

    // * Main Route
    app.use('/api', mainRoute);

    // * 404 Not Found
    app.use((_, res) => ResponseHelper.failed(res, 404, { message: 'Path Not Found. Please go to /api' }));

    // * Return express app
    return app;
};

export default init;
