import express from "express";
import MainController from "../controllers/MainController.js";

const Route = express.Router();

Route.get("/page/:page", MainController.getAnimePerPage);
Route.get("/:slug", MainController.getAnimeDetail);

export default Route;
