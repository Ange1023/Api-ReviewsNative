import Movie from "../schemas/movie.js";
import BaseModel from "../utils/baseModel.js";


class movieModel extends BaseModel {
    constructor() {
        super(Movie);
    }
}

export default new movieModel();