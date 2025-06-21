
import  tmdbApi  from '../utils/tmdbApi.js';
import categoryModel from '../models/category.js';
import movieModel from '../models/movie.js'
import { AppError } from '../utils/appError.js';

class SearchService {
    async searchMoviesByName(body) {
        const { name, page } = body;
        if (!name) {
            throw new AppError("El nombre de la película es requerido", 400);
        }
        const res = await tmdbApi.searchMovies(name, page)

        const customResult ={
            totalItems: res.total_results,
            currentPage: res.page,
            totalPages: res.total_pages,
            results: res.results.map(movie => ({
                id: movie.id,
                title: movie.title,
                release_date: movie.release_date,
                poster_path: movie.poster_path || movie.backdrop_path,
                user_rating: 0,
                critic_rating: 0,
                total_rating: 0,
            }))
        }

        if (customResult.totalItems === 0) {
            throw new AppError("No se encontraron películas con ese nombre", 404);
        }

        return customResult;
    }

    async searchSeriesByName(body) {
        const { name, page } = body;
        if (!name) {
            throw new AppError("El nombre de la serie es requerido", 400);
        }
        const res =  await tmdbApi.searchSeries(name, page)

        const customResult ={
            totalItems: res.total_results,
            currentPage: res.page,
            totalPages: res.total_pages,
            results: res.results.map(serie => ({
                id: serie.id,
                title: serie.name,
                release_date: serie.first_air_date,
                poster_path: serie.poster_path || serie.backdrop_path,
                user_rating: 0,
                critic_rating: 0,
                total_rating: 0,
            }))
        }

        if (customResult.totalItems === 0) {
            throw new AppError("No se encontraron series con ese nombre", 404);
        }

        return customResult;
    }


    async searchByCategories(body) {

        const { categories } = body;
        
        if (!categories || categories.length === 0) throw new AppError("Las categorías son requeridas", 400);
        
        const categoryData = await categoryModel.findByFilter({ _id: { $in: categories } })

        const categoriesId = categoryData.map(cat => cat._id)
        const categoriesTmbdId = categoryData.map(cat => cat.tmdb_id).join('|')

        // const movies = await movieModel.findByFilter({categories:{ $in: categoriesId}})

        const res = await tmdbApi.discoverMovies({genres: categoriesTmbdId })

        const customResult ={
            totalItems: res.total_results,
            currentPage: res.page,
            totalPages: res.total_pages,
            results: res.results.map(movie => ({
                id: movie.id,
                title: movie.title,
                release_date: movie.release_date,
                poster_path: movie.poster_path || movie.backdrop_path,
                user_rating: 0,
                critic_rating: 0,
                total_rating: 0,
            }))
        }

        if (customResult.totalItems === 0) {
            throw new AppError("No se encontraron películas con ese nombre", 404);
        }

        return customResult;

    }
}
export default new SearchService();