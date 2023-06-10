import express from "express";
import MainController from "../controllers/MainController.js";

const Route = express.Router();

Route.get("/page/:page", MainController.getAnimePerPage);
Route.get("/anime/:slug", MainController.getAnimeDetail);
Route.get("/rekomendasi", MainController.getRekomendasi);
Route.get("/genres", MainController.getGenres);
Route.get("/genres/:genre/page/:page", MainController.getAnimeByGenres);

export default Route;
