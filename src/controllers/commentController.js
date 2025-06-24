import commentService from "../services/commentService.js";
import { catchAsync, sendResponse } from "../utils/appError.js";

class CommentController {
    create = catchAsync(async (req, res, next) => {
        const comment = await commentService.createComment(req.body);
        sendResponse(res, 201, "Comentario creado exitosamente", { comment });
    });

    update = catchAsync(async (req, res, next) => {
        const comment = await commentService.updateComment(req.params.id, req.body);
        sendResponse(res, 200, "Comentario actualizado exitosamente", { comment });
    });

    delete = catchAsync(async (req, res, next) => {
        const comment = await commentService.deleteComment(req.params.id);
        sendResponse(res, 200, "Comentario eliminado exitosamente", null);
    });

    getAll = catchAsync(async (req, res, next) => {
        const comments = await commentService.getAllComments();

        if (!comments || comments.length === 0) return sendResponse(res, 404, "No se encontraron comentarios", null);
        sendResponse(res, 200, "Comentarios encontrados exitosamente", { comments });
    });

    getPaginated = catchAsync(async (req, res, next) => {

        const { page, limit, media_id, role } = req.body;

        const comments = await commentService.getPaginatedComments(page, limit, media_id, role);

        if (!comments || comments.totalItems === 0) return sendResponse(res, 404, "No se encontraron comentarios para este medio", null);
        
        sendResponse(res, 200, "Comentarios paginados encontrados exitosamente", comments);
    });
}

export default new CommentController();