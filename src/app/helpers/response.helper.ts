/**
 * @description - This file contain a class that helps to send response to the client
 * @author {Deo Sbrn}
 */

import { Response } from 'express';

export default class ResponseHelper {
    /**
     * @description - This method is used to send a success response to the client
     * @param {Response} res - Express response object
     * @param {number} status - HTTP status code
     * @param {Record<string, any>} data - Data to be sent to the client
     * @returns {Response} - Express response object
     */
    static success(res: Response, status: number, data: Record<string, any>): Response {
        return res.status(status).type('application/json').json({ success: true, data });
    }

    /**
     * @description - This method is used to send a failed response to the client
     * @param {Response} res - Express response object
     * @param {number} status - HTTP status code
     * @param {Record<string, any>} err - Error to be sent to the client
     * @returns {Response} - Express response object
     */
    static failed(res: Response, status: number, err: Record<string, any>) {
        return res.status(status).type('application/json').json({ success: false, err });
    }
}
