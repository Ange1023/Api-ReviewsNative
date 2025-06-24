import Movie from "../schemas/movie.js";
import BaseModel from "../utils/baseModel.js";


class movieModel extends BaseModel {
    constructor() {
        super(Movie);
    }

    paginate = async (filter = {}, options = { currentPage: 1, limit: 10 }) => { 
        const { currentPage, limit } = options;
        const skip = (currentPage - 1) * limit;

        const data = await this.model.find(filter).skip(skip).limit(limit);
        const totalItems = await this.model.countDocuments(filter);

        const results = data.map(movie => ({
            id: movie._id,
            title: movie.title,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
            user_rating: movie.user_rating || 0,
            critic_rating: movie.critic_rating || 0,
            total_rating: movie.total_rating || 0,
        }));

        return {
            totalItems,
            currentPage,
            totalPages: Math.ceil(totalItems / limit),
            results
        };
    }
}

export default new movieModel();