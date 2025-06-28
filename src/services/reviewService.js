import ReviewModel from '../models/review.js';
import { AppError } from '../utils/appError.js';


class ReviewService {

    async createReview(reviewData) {
        const { user_id, movie_id, serie_id } = reviewData;
    
        if (movie_id) {
            const exists = await ReviewModel.findOne({ user_id, movie_id });
            if (exists) throw new AppError("Ya existe una reseña para esta película", 400);
        }

        if (serie_id) {
            const exists = await ReviewModel.findOne({ user_id, serie_id });
            if (exists) throw new AppError("Ya existe una reseña para esta serie", 400);
        }
        const data = await ReviewModel.create(reviewData);

        if (data) await ReviewModel.updatedRatings({ movie_id, serie_id });

        return data;
    }

    async deleteReview(reviewId) {

        const review = await ReviewModel.findById(reviewId);

        const { movie_id, serie_id } = review;

        if (!review) return null;

        const data = await ReviewModel.delete(reviewId);    

        if (data) await ReviewModel.updatedRatings({ movie_id, serie_id });

        return data;
    }

    async getAllReviews() {
        return await ReviewModel.findAll();
    }

    async updateReview(reviewId, reviewData) {

        const review = await ReviewModel.findById(reviewId);

        if (!review) return null;

        const { movie_id, serie_id } = review;

        const data = await ReviewModel.update(reviewId, reviewData);

        if (data) await ReviewModel.updatedRatings({ movie_id, serie_id });

        return data;
    }

    async getUserReview({ user_id, movie_id = null, serie_id = null }) {
        if (!user_id || (!movie_id && !serie_id)) return null;
        const filter = { user_id };
        if (movie_id) filter.movie_id = movie_id;
        if (serie_id) filter.serie_id = serie_id;
        return await ReviewModel.findOne(filter);
    }
}

export default new ReviewService();