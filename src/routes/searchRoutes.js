import express from "express";
import searchController from "../controllers/searchController.js";

const router = express.Router();

router.post("/movie",searchController.searchMovies)
router.post("/serie",searchController.searchSeries)

export default router;
