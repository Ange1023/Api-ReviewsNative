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
        sendResponse(res, 204, 'Película eliminada exitosamente');
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
        sendResponse(res, 200, 'Películas encontradas exitosamente', {
            data,
        });
    });
}
export default new movieController();