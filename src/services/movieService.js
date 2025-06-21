import movieModel from '../models/movie.js';
import categoryModel from '../schemas/category.js';
import  tmdbApi  from '../utils/tmdbApi.js';
import { AppError } from '../utils/appError.js';

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

    async getMovieByTmdbId(tmdbId) {

        const movie = await movieModel.findOne({ tmdb_id: tmdbId });

        if (!movie) {

            const tmdbMovie = await tmdbApi.getMovieDetails(tmdbId);

            if (!tmdbMovie) throw new AppError("No se encontró la película en TMDB", 404);

            const categoriesData = await categoryModel.find({ tmdb_id: { $in: tmdbMovie.genres.map(genre => genre.id) } }).select('_id');

            if (categoriesData.length === 0) throw new AppError("No se encontraron categorías para la película", 404);
            
            const castData = await tmdbApi.getMovieCredits(tmdbId);

            if (!castData || !castData.cast) throw new AppError("No se encontraron actores para la película", 404);

            const actors = castData.cast
            .filter(person => person.known_for_department === 'Acting')
            .map(actor => ({
                name: actor.name,
                role: 'Actor'
            }));

            const directors = castData.crew
                .filter(person => person.job === 'Director')
                .map(director => ({
                    name: director.name,
                    role: 'Director'
            }));

            const cast = [...actors, ...directors];
            
            const movieData = {
                tmdb_id: tmdbMovie.id,
                title: tmdbMovie.title,
                synopsis: tmdbMovie.overview,
                release_date: tmdbMovie.release_date,
                runtime: tmdbMovie.runtime,
                poster_path: tmdbMovie.poster_path || tmdbMovie.backdrop_path,
                categories: categoriesData,
                cast: cast.map(person => ({
                    name: person.name,
                    role: person.role,
                })),
                user_rating: 0,
                critic_rating: 0,
                total_rating: 0,
            };

            return await movieModel.create(movieData);
        }
        
        return movie;
    }


}

export default new MovieService();

