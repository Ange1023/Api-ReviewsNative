import MediaId from "../schemas/mediaId.js";
import BaseModel from "../utils/baseModel.js";


class mediaIdModel extends BaseModel {
    constructor() {
        super(MediaId);
    }
}

export default new mediaIdModel();