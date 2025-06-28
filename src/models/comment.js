import Comment from "../schemas/comment.js";
import BaseModel from "../utils/baseModel.js";


class CommentModel extends BaseModel {

    constructor() {
        super(Comment);
    }

    async getPaginateComments(page = 1, limit = 10, media_id, role) {

        const query = [
            { movie_id: media_id },
            { serie_id: media_id }
        ];

        const skip = (page - 1) * limit;

        const comments = await this.model.find({ $or: query })
            .populate({
                path: 'user_id',
                match: { role }, 
                select: 'user_name avatar'
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const filtered = comments.filter(c => c.user_id);

        const totalItems = filtered.length;

        return {
            data: filtered.map(c => ({
                id: c._id,
                content: c.content,
                createdAt: c.createdAt,
                updatedAt: c.updatedAt,
                user_name: c.user_id.user_name,
                avatar: c.user_id.avatar
            })),
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit)
        };
    }
}

export default new CommentModel();