import categoryService from "../services/categoryService.js";
import { catchAsync, sendResponse } from "../utils/appError.js";

class categoryController {
    create = catchAsync(async (req, res, next) => {
        const category = await categoryService.createCategory(req.body);
        sendResponse(res, 201, "Categoría creada exitosamente", {
            category,
        });
    });
    
    delete = catchAsync(async (req, res, next) => {
        await categoryService.deleteCategory(req.params.id);
        sendResponse(res, 200, "Categoría eliminada exitosamente", null);
    });

    getAll = catchAsync(async (req, res, next) => {
        const categories = await categoryService.getAllCategories();
        if (!categories || categories.length === 0) {
            return sendResponse(res, 404, "No se encontraron categorías", null);
        }
        sendResponse(res, 200, "Categorías encontradas exitosamente", {
            categories,
        });
    });

    getAllMovies = catchAsync(async (req, res, next) => {
        const categories = await categoryService.getAllMoviesCategories();
        if (!categories || categories.length === 0) {
            return sendResponse(res, 404, "No se encontraron categorías de películas", null);
        }
        sendResponse(res, 200, "Categorías de películas encontradas exitosamente", {
            categories,
        });
    });

    getAllSeries = catchAsync(async (req, res, next) => {
        const categories = await categoryService.getAllSeriesCategories();
        if (!categories || categories.length === 0) {
            return sendResponse(res, 404, "No se encontraron categorías de series", null);
        }
        sendResponse(res, 200, "Categorías de series encontradas exitosamente", {
            categories,
        });
    });
    
}

export default new categoryController();