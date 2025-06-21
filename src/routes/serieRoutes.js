import express from "express";
import serieController from "../controllers/serieController.js";

const router = express.Router();

router.get("/:id", serieController.getByTmdbId); 
router.get("/", serieController.getAll);
router.post("/", serieController.create);
router.delete("/:id", serieController.delete);


export default router;
