/**
 * @description This file is the entry point of the application
 * @description It will bootstrap the application and start the server using IIFE (Immediately Invoked Function Expression)
 * @description It will also initialize socket.io and listen to connection event
 * @author {Deo Sbrn}
 */

import { Application } from 'express';
import init from './app';
import { logger } from './logger';

/**
 * Bootstrap the application
 */
(() => {
    const PORT = 8000;
    const app: Application = init();
    app.listen(PORT, () => logger.info('Server', `started on port ${PORT}`));
})();
