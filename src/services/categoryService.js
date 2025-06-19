import CategoryModel from '../models/category.js';
import { AppError } from '../utils/appError.js';

class CategoryService {

    async createCategory(categoryData) {
        const data = await CategoryModel.create(categoryData);
        if (!data) throw new AppError(400, 'Error al crear la categoría', 'CategoryService', 'createCategory');
        return data;
    }

    async deleteCategory(categoryId) {
        const data = await CategoryModel.delete(categoryId);
        if (!data) throw new AppError(404, 'Categoría no encontrada', 'CategoryService', 'deleteCategory');
        return data;
    }

    async getAllCategories() {
        const data = await CategoryModel.findAll();
        if (!data || data.length === 0) throw new AppError(404, 'No se encontraron categorías', 'CategoryService', 'getAllCategories');
        return data;
    }
}

export default new CategoryService();