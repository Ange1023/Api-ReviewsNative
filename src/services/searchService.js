import tmdbApi from '../utils/tmdbApi.js';
import categoryModel from '../models/category.js';
import movieModel from '../models/movie.js';
import serieModel from '../models/serie.js';
import { AppError } from '../utils/appError.js';

function formatMovieResult(movie) {
    return {
        id: movie.tmdb_id || movie.id,
        title: movie.title,
        release_date: movie.release_date,
        poster_path: movie.poster_path || movie.backdrop_path,
        user_rating: movie.user_rating || 0,
        critic_rating: movie.critic_rating || 0,
        total_rating: movie.total_rating || 0,
    };
}

function formatSerieResult(serie) {
    return {
        id: serie.tmdb_id || serie.id,
        title: serie.name || serie.title,
        release_date: serie.first_air_date || serie.release_date,
        poster_path: serie.poster_path || serie.backdrop_path,
        user_rating: serie.user_rating || 0,
        critic_rating: serie.critic_rating || 0,
        total_rating: serie.total_rating || 0,
    };
}

function buildCustomResult(res, type) {
    return {
        totalItems: res.total_results,
        currentPage: res.page,
        totalPages: res.total_pages,
        results: res.results.map(type === 'movie' ? formatMovieResult : formatSerieResult)
    };
}

async function mergeWithLocalResults(apiResults, model) {
    const tmdbIds = apiResults.map(item => item.id);
    const localItems = await model.findByFilter({ tmdb_id: { $in: tmdbIds } });
    if (!localItems.length) return apiResults;

    const localMap = new Map(localItems.map(item => [item.tmdb_id, item]));
    return apiResults.map(apiItem => localMap.get(apiItem.id) || apiItem);
}

class SearchService {

    async searchMoviesByName({ name, page }) {
        if (!name) throw new AppError("El nombre de la película es requerido", 400);

        const res = await tmdbApi.searchMovies(name, page);

        res.results = await mergeWithLocalResults(res.results, movieModel);

        const customResult = buildCustomResult(res, 'movie');

        if (customResult.totalItems === 0) throw new AppError("No se encontraron películas con ese nombre", 404);
        return customResult;
    }

    async searchSeriesByName({ name, page }) {
        if (!name) throw new AppError("El nombre de la serie es requerido", 400);

        const res = await tmdbApi.searchSeries(name, page);

        res.results = await mergeWithLocalResults(res.results, serieModel);

        const customResult = buildCustomResult(res, 'serie');

        if (customResult.totalItems === 0)  throw new AppError("No se encontraron series con ese nombre", 404);
        
        return customResult;
    }

    async searchByCategories({ categories, page, type }) {

        if (!categories || categories.length === 0)  throw new AppError("Las categorías son requeridas", 400);
        

        const categoryData = await categoryModel.findByFilter({ _id: { $in: categories } });
        const categoriesTmbdId = categoryData.map(cat => cat.tmdb_id).join('|');

        if (type === 'movie') {
            const res = await tmdbApi.discoverMovies(categoriesTmbdId, page);
            
            res.results = await mergeWithLocalResults(res.results, movieModel);

            const customResult = buildCustomResult(res, 'movie');
            if (customResult.totalItems === 0) throw new AppError("No se encontraron películas con esas categorías", 404);
            
            return customResult;
        } else if (type === 'serie') {
            
            const res = await tmdbApi.discoverSeries(categoriesTmbdId, page);

            res.results = await mergeWithLocalResults(res.results, serieModel);

            const customResult = buildCustomResult(res, 'serie');
            if (customResult.totalItems === 0) throw new AppError("No se encontraron series con esas categorías", 404);
    
            return customResult;
        } else {
            throw new AppError("El tipo de búsqueda es requerido y debe ser 'movie' o 'serie'", 400);
        }
    }
}

export default new SearchService();