/**
 * @description This file contain all application configurations
 * @author {Deo Sbrn}
 */

import { CorsOptions } from 'cors';
import { Options } from 'express-rate-limit';

export const corsConfig = (): CorsOptions => ({
    credentials: true,
    origin: true,
});

export const limitterConfig = (): Partial<Options> => ({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: 'draft-7',
    legacyHeaders: true,
    statusCode: 429,
    message: 'Too many requests, please try again later.',
});
