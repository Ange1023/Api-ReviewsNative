import express from 'express';
import reviewController from '../controllers/reviewController.js';
import {verifyToken} from '../services/authService.js';


const router = express.Router();

router.post("/", verifyToken, reviewController.createReview);
router.delete("/:id", reviewController.deleteReview);
router.get("/", reviewController.getAllReviews);
router.put("/:id", reviewController.updateReview);
router.post("/user", verifyToken, reviewController.getUserReview);


export default router;