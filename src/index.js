/**
 * @description - This file is the entry point of the project
 * @author {Deo Sbrn}
 */

import cors from 'cors';
import express from 'express';
import Route from './routes/index.js';
import ResponseHelper from './helpers/ResponseHelper.js';

const app = express();

app.use(cors());

app.use('/api', Route);

app.use((_, res) => ResponseHelper.success(res, 200, { message: 'Welcome to Kusonime REST API.' }));

app.listen(8000, () => console.log('Server in port 8000'));
