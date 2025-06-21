import Category from "../schemas/category.js";
import BaseModel from "../utils/baseModel.js";


class categoryModel extends BaseModel {
    constructor() {
        super(Category);
    }

    async getAllMovies() {
        return await Category.find({type: { $in: ['movie', 'both'] }});
    }
    async getAllSeries() {
        return await Category.find({type: { $in: ['serie', 'both'] }});
    }
}

export default new categoryModel();