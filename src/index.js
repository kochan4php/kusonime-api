/**
 * @description - This file is the entry point of the project
 * @author {Deo Sbrn}
 */

import cors from 'cors';
import express from 'express';
import Route from './routes/index.js';
import ResponseHelper from './helpers/ResponseHelper.js';

/**
 * Bootstraps the application
 */
(function () {
    // * Initialize express application
    const app = express();

    // * Middlewares
    app.use(cors());

    // * Api routes
    app.use('/api', Route);

    // * Default route
    app.use((_, res) => ResponseHelper.success(res, 200, { message: 'Welcome to Kusonime REST API.' }));

    // * Start the server
    app.listen(8000, () => console.log('Server in port 8000'));
})();
