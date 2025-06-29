import movieModel from '../models/movie.js';
import categoryModel from '../schemas/category.js';
import mediaIdModel from '../models/mediaId.js';
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
    //CORREGIR URGENTEMENTE
    async getMovieByTmdbId(tmdbId) {

        let movieId = await mediaIdModel.findOne({ tmdb_id: tmdbId, media_type: 'movie' });
     
        if (!movieId) {

            const tmdbMovie = await tmdbApi.getMovieDetails(tmdbId);

            console.log(tmdbMovie, 'tmdbMovie');
            
            if (!tmdbMovie) throw new AppError("No se encontró la película en TMDB", 404);

            const categoriesData = await categoryModel.find({ tmdb_id: { $in: tmdbMovie.genres.map(genre => genre.id) } }).select('_id');

            // Si no hay categorías, asigna un array vacío
            const categories = categoriesData.length > 0 ? categoriesData : [];

            const castData = await tmdbApi.getMovieCredits(tmdbId);

            // Si no hay cast, asigna un array vacío
            const actors = castData && castData.cast
                ? castData.cast.filter(person => person.known_for_department === 'Acting').map(actor => ({
                    name: actor.name,
                    role: 'Actor'
                }))
                : [];

           const directors = castData && castData.crew
                ? castData.crew.filter(person => person.job === 'Director').map(director => ({
                    name: director.name,
                    role: 'Director'
                }))
                : [];

            const cast = [...actors, ...directors];
                        
            const movieData = {
                tmdb_id: tmdbMovie.id,
                title: tmdbMovie.title,
                synopsis: tmdbMovie.overview,
                release_date: tmdbMovie.release_date,
                runtime: tmdbMovie.runtime,
                poster_path: tmdbMovie.poster_path || tmdbMovie.backdrop_path,
                categories: categories,
                cast: cast,
                user_rating: 0,
                critic_rating: 0,
                total_rating: 0,
            };

            if (!movieData.poster_path) delete movieData.poster_path;
            
            await movieModel.create(movieData);
            await mediaIdModel.create({tmdb_id: tmdbId, media_type: 'movie'})
            // Buscar el movieId actualizado
            movieId = await mediaIdModel.findOne({ tmdb_id: tmdbMovie.id, media_type: 'movie' });
        }
        
        const movie = await movieModel.findOne({ tmdb_id: movieId.tmdb_id });
        if (!movie) return new AppError("No se encontró la película en la base de datos", 404);
        await movie.populate('categories', 'name');
        await movie.populate('comments_count');
        return movie;
    }

    async paginateMovies(filter = {}, options = { currentPage: 1, limit: 10, sortByRating, sortByDate }) {
        
        const data = await movieModel.paginate(filter, options);
        return data;
    }

}

export default new MovieService();

