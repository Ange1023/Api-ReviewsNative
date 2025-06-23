import express from 'express';
import reviewController from '../controllers/reviewController.js';


const router = express.Router();

router.post("/", reviewController.createReview);
router.delete("/:id", reviewController.deleteReview);
router.get("/", reviewController.getAllReviews);
router.put("/:id", reviewController.updateReview);


export default router;