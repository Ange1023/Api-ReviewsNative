import express from "express";
import movieController from "../controllers/movieController.js";

const router = express.Router();

router.get("/:id", movieController.getByTmdbId); 
router.get("/", movieController.getAll);
router.post("/", movieController.create);
router.delete("/:id", movieController.delete);


export default router;
