import CategoryModel from '../models/category.js';

class CategoryService {

    async createCategory(categoryData) {
        return await CategoryModel.create(categoryData);

    }

    async deleteCategory(categoryId) {
        return await CategoryModel.delete(categoryId);

    }

    async getAllCategories() {
        return await CategoryModel.findAll();
    }

    async getAllMoviesCategories() {
        return await CategoryModel.getAllMovies();
    }

    async getAllSeriesCategories() {
        return await CategoryModel.getAllSeries();
    }

}

export default new CategoryService();