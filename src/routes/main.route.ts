/**
 * @description - This file contain all routes for kusonime api endpoints
 * @author {Deo Sbrn}
 */

import express from 'express';
import MainController from '../app/controllers/main.controller';

/**
 * @description - Init express router
 * @var Router router
 */
const router = express.Router();

/**
 * @method GET
 * @access public
 * @endpoint /api/page/:page
 * @example /api/page/1
 */
router.get('/page/:page', MainController.getAnimePerPage);

/**
 * @method GET
 * @access public
 * @endpoint /api/anime/:slug
 * @example /api/anime/sukimega-batch-subtitle-indonesia
 */
router.get('/anime/:slug', MainController.getAnimeDetail);

/**
 * @method GET
 * @access public
 * @endpoint /api/rekomendasi
 */
router.get('/rekomendasi', MainController.getRekomendasi);

/**
 * @method GET
 * @access public
 * @endpoint /api/search/:query
 * @example /api/search/high+school+dxd
 */
router.get('/search/:query', MainController.searchAnime);

/**
 * @method GET
 * @access public
 * @endpoint /api/genres
 */
router.get('/genres', MainController.getGenres);

/**
 * @method GET
 * @access public
 * @endpoint /api/genres/:genre/page/:page
 * @example /api/genres/harem/page/1
 */
router.get('/genres/:genre/page/:page', MainController.getAnimeByGenres);

/**
 * @method GET
 * @access public
 * @endpoint /api/seasons
 */
router.get('/seasons', MainController.getSeasons);

/**
 * @method GET
 * @access public
 * @endpoint /api/seasons/:season/page/:page
 * @example /api/seasons/spring-2016/page/1
 */
router.get('/seasons/:season/page/:page', MainController.getAnimeBySeasons);

export default router;
