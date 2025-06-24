import Serie from "../schemas/serie.js";
import BaseModel from "../utils/baseModel.js";


class serieModel extends BaseModel {
    constructor() {
        super(Serie);
    }

    paginate = async (filter = {}, options = { currentPage: 1, limit: 10 }) => { 
        const { currentPage, limit } = options;
        const skip = (currentPage - 1) * limit;

        const data = await this.model.find(filter).skip(skip).limit(limit);
        const totalItems = await this.model.countDocuments(filter);

        const results = data.map(serie => ({
            id: serie._id,
            tmdb_id: serie.tmdb_id,
            title: serie.title,
            release_date: serie.first_air_date,
            poster_path: serie.poster_path || serie.backdrop_path,
            user_rating: serie.user_rating || 0,
            critic_rating: serie.critic_rating || 0,
            total_rating: serie.total_rating || 0,
        }));

        return {
            totalItems,
            currentPage,
            totalPages: Math.ceil(totalItems / limit),
            results
        };
    }
}

export default new serieModel();