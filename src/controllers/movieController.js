import movieService from '../services/movieService.js';
import { catchAsync, sendResponse } from '../utils/appError.js';

class movieController {

    create = catchAsync(async (req, res, next) => {
        const movieData = req.body;
        const data = await movieService.createMovie(movieData);
        sendResponse(res, 201, 'Película creada exitosamente', {
            data,
        });
    });

    delete = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        await movieService.deleteMovie(id);
        sendResponse(res, 200, 'Película eliminada exitosamente');
    });


    getOne = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const data = await movieService.getMovieById(id);
        sendResponse(res, 200, 'Película encontrada exitosamente', {
            data,
        });
    });

    getByTmdbId = catchAsync(async (req, res, next) => {

        const { id } = req.params;

        const data = await movieService.getMovieByTmdbId(id);
        sendResponse(res, 200, 'Película encontrada exitosamente', {
            data,
        });
    });

    getAll = catchAsync(async (req, res, next) => {
        const data = await movieService.getAllMovies();
        if (!data || data.length === 0) {
            return sendResponse(res, 404, 'No se encontraron películas', null);
        }
        sendResponse(res, 200, 'Películas encontradas exitosamente', {
            data,
        });
    });

    getPaginated = catchAsync(async (req, res, next) => {
        const { currentPage = 1, limit = 10, ...filters } = req.body;
        const options = { currentPage: parseInt(currentPage), limit: parseInt(limit) };

        const result = await movieService.paginateMovies(filters, options);

        if (!result) return sendResponse(res, 404, 'No se encontraron películas', null);
        
        sendResponse(res, 200, 'Películas paginadas', result);
    });
}
export default new movieController();