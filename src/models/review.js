import Review from "../schemas/review.js";
import BaseModel from "../utils/baseModel.js";
import Movie from '../schemas/movie.js';
import Serie from '../schemas/serie.js';


class reviewModel extends BaseModel {
    constructor() {
        super(Review);
    }

    async updatedRatings({ movie_id = null, serie_id = null }) {
        let filter = {};
        let Model = null;

        if (movie_id) {
            filter = { movie_id };
            Model = Movie;
        } else if (serie_id) {
            filter = { serie_id };
            Model = Serie;
        } else {
            return null;
        }

        const reviews = await Review.find(filter).populate('user_id', 'role');

        let userSum = 0, userCount = 0;
        let criticSum = 0, criticCount = 0;

        for (const review of reviews) {
            if (review.user_id.role === 'critic') {
                criticSum += review.score;
                criticCount++;
            } else if (review.user_id.role === 'user') {
                userSum += review.score;
                userCount++;
            }
        }

        const user_rating = userCount ? Math.round((userSum / userCount) * 20) : 0;
        const critic_rating = criticCount ? Math.round((criticSum / criticCount) * 20) : 0;
        const total_rating = (user_rating && critic_rating)
            ? Math.round((user_rating + critic_rating) / 2)
            : Math.round(user_rating || critic_rating);

        await Model.findOneAndUpdate(
            movie_id ? { _id: movie_id } : { _id: serie_id },
            { user_rating, critic_rating, total_rating }
        );
    }
}

export default new reviewModel();