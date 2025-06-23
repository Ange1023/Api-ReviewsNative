import CommentModel from '../models/comment.js';
import { AppError } from '../utils/appError.js';

class CommentService {

    async createComment(commentData) {
        return await CommentModel.create(commentData);
    }

    async deleteComment(commentId) {
        return await CommentModel.delete(commentId);
    }

    async updateComment(commentId, commentData) {
        return await CommentModel.update(commentId, commentData);
    }
    
    async getAllComments() {
        return await CommentModel.findAll();
    }

    async getPaginatedComments(page, limit, media_id, role) {

        if (!role) throw new AppError("El rol del usuario es requerido", 400);

        if (!media_id) throw new AppError("El ID del medio es requerido", 400);

        return await CommentModel.getPaginateComments(page, limit, media_id, role);
    }
}

export default new CommentService();