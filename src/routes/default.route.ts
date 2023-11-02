/**
 * @description - This file contain default route for all endpoints
 * @author {Deo Sbrn}
 */

import express from 'express';
import DefaultController from '../app/controllers/default.controller';

/**
 * @description - Init express router
 * @var Router router
 */
const router = express.Router();

/**
 * @method GET
 * @access public
 * @endpoint *
 * @example *
 */
router.use(DefaultController.index);

export default router;
