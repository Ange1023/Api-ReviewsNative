import searchService from "../services/searchService.js";
import { catchAsync, sendResponse } from "../utils/appError.js";

class searchController  {

    searchMovies = catchAsync(async (req, res, next) => {

        const data = await searchService.searchMoviesByName(req.body);
        sendResponse(res, 200, "Películas encontradas exitosamente", {
            data,
        });

    });

    searchSeries = catchAsync(async (req, res, next) => {

        const data = await searchService.searchSeriesByName(req.body);
        sendResponse(res, 200, "Series encontradas exitosamente", {
            data,
        });
    });

}

export default new searchController();