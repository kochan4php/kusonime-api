import { Request, Response } from 'express';
import ResponseHelper from '../helpers/response.helper';

export default class DefaultController {
    public static index(_: Request, res: Response): Response {
        return ResponseHelper.success(res, 200, {
            message: 'Welcome to Unofficial Kusonime REST API',
            'api-docs': 'https://brick-red-cricket-gown.cyclic.app/api-docs/',
        });
    }
}
