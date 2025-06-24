import express from "express";
import CommentController from '../controllers/commentController.js';

const router = express.Router();

router.post('/paginate', CommentController.getPaginated); 

router.route('/')
    .post(CommentController.create)
    .get(CommentController.getAll) 

router.route('/:id')
    .put(CommentController.update) 
    .delete(CommentController.delete) 

export default router;