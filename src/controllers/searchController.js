import searchService from "../services/searchService.js";
import { catchAsync, sendResponse } from "../utils/appError.js";

class searchController  {

    searchMovies = catchAsync(async (req, res, next) => {

        const data = await searchService.searchMoviesByName(req.body);
        if (!data || data.length === 0) return sendResponse(res, 404, "No se encontraron películas", null);
        sendResponse(res, 200, "Películas encontradas exitosamente", {
            data,
        });

    });

    searchSeries = catchAsync(async (req, res, next) => {

        const data = await searchService.searchSeriesByName(req.body);
        if (!data || data.length === 0) return sendResponse(res, 404, "No se encontraron series", null);
        sendResponse(res, 200, "Series encontradas exitosamente", {
            data,
        });
    });

    searchByCategories = catchAsync(async (req, res, next) => {

        const data = await searchService.searchByCategories(req.body);
        if (!data || data.length === 0) return sendResponse(res, 404, "No se encontraron resultados para estas categorías", null);
        sendResponse(res, 200, "Categorías encontradas exitosamente", {
            data,
        });
    });

}

export default new searchController();