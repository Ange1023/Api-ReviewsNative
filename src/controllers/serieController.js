import serieService from '../services/serieService.js';
import { catchAsync, sendResponse } from '../utils/appError.js';

class serieController {

    create = catchAsync(async (req, res, next) => {
        const serieData = req.body;
        const data = await serieService.createSerie(serieData);
        sendResponse(res, 201, 'Serie creada exitosamente', {
            data,
        });
    });

    delete = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        await serieService.deleteSerie(id);
        sendResponse(res, 204, 'Serie eliminada exitosamente');
    });


    getOne = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const data = await serieService.getSerieById(id);
        sendResponse(res, 200, 'Serie encontrada exitosamente', {
            data,
        });
    });

    getByTmdbId = catchAsync(async (req, res, next) => {

        const { id } = req.params;

        const data = await serieService.getSerieByTmdbId(id);
        sendResponse(res, 200, 'Serie encontrada exitosamente', {
            data,
        });
    });

    getAll = catchAsync(async (req, res, next) => {
        const data = await serieService.getAllSeries();
        sendResponse(res, 200, 'Series encontradas exitosamente', {
            data,
        });
    });
}
export default new serieController();