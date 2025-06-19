import Category from "../schemas/category.js";
import BaseModel from "../utils/baseModel.js";


class categoryModel extends BaseModel {
    constructor() {
        super(Category);
    }
}

export default new categoryModel();