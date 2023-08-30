/**
 * @description - This file contain all routes for kusonime api endpoints
 * @author {Deo Sbrn}
 */

import express from "express";
import MainController from "../controllers/MainController.js";

const router = express.Router();

router.get("/page/:page", MainController.getAnimePerPage);
router.get("/anime/:slug", MainController.getAnimeDetail);
router.get("/rekomendasi", MainController.getRekomendasi);
router.get("/search/:query", MainController.searchAnime);
router.get("/genres", MainController.getGenres);
router.get("/genres/:genre/page/:page", MainController.getAnimeByGenres);
router.get("/seasons", MainController.getSeasons);
router.get("/seasons/:season/page/:page", MainController.getAnimeBySeasons);

export default router;
