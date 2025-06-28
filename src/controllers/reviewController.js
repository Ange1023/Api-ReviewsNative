import reviewService from "../services/reviewService.js";
import { catchAsync, sendResponse } from "../utils/appError.js";

class ReviewController {

    createReview = catchAsync(async (req, res, next) => {

        const userId = req.user.user_id;

        req.body.user_id = userId;

        const reviewData = req.body;
        const data = await reviewService.createReview(reviewData);
        sendResponse(res, 201, "Reseña creada exitosamente", { data });
    });

    deleteReview = catchAsync(async (req, res, next) => {
        const reviewId = req.params.id;

        const review = await reviewService.deleteReview(reviewId);

        if (!review) return sendResponse(res, 404, "Reseña no encontrada", null);
        sendResponse(res, 200, "Reseña eliminada exitosamente", null);
    });

    getAllReviews = catchAsync(async (req, res, next) => {
        const data = await reviewService.getAllReviews();
        if (!data || data.length === 0) return sendResponse(res, 404, "No se encontraron reseñas", null);
        sendResponse(res, 200, "Reseñas obtenidas exitosamente", { data });
    });

    updateReview = catchAsync(async (req, res, next) => {
        const reviewId = req.params.id;
        const reviewData = req.body;
        
        const data = await reviewService.updateReview(reviewId, reviewData);
        sendResponse(res, 200, "Reseña actualizada exitosamente", { data });
    });

    getUserReview = catchAsync(async (req, res, next) => {

        const userId = req.user.user_id;
        req.body.user_id = userId;
        const reviewData = req.body;

        const data = await reviewService.getUserReview(reviewData);
        sendResponse(res, 200, "Reseña obtenida exitosamente", { data });
    });

}

export default new ReviewController();
