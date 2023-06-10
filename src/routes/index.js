import express from "express";
import MainController from "../controllers/MainController.js";

const Route = express.Router();

Route.get("/page/:page", MainController.getAnimePerPage);
Route.get("/anime/:slug", MainController.getAnimeDetail);
Route.get("/rekomendasi", MainController.getRekomendasi);
Route.get("/search/:query", MainController.searchAnime);
Route.get("/genres", MainController.getGenres);
Route.get("/genres/:genre/page/:page", MainController.getAnimeByGenres);
Route.get("/seasons", MainController.getSeasons);
Route.get("/seasons/:season/page/:page", MainController.getAnimeBySeasons);

export default Route;
