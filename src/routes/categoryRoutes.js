import express from "express";
import CategoryController from "../controllers/categoryController.js";

const router = express.Router();

router.get("/all",CategoryController.getAll)
router.post("/",CategoryController.create)
router.delete("/:id",CategoryController.delete)
router.get("/movies",CategoryController.getAllMovies)
router.get("/series",CategoryController.getAllSeries)


export default router;
