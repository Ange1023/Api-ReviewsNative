import Serie from "../schemas/serie.js";
import BaseModel from "../utils/baseModel.js";


class serieModel extends BaseModel {
    constructor() {
        super(Serie);
    }
}

export default new serieModel();