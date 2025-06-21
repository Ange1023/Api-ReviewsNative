import movieModel from '../schemas/movie.js';

class MovieService {

    async createMovie(movieData) {
        return await movieModel.create(movieData);
    }

    async deleteMovie(movieId) {
        return await movieModel.delete(movieId);
    }

    async getAllMovies() {
        return await movieModel.findAll();
        
    }

    async getMovieById(movieId) {
        return await movieModel.findById(movieId);
    }

}

export default new MovieService();

