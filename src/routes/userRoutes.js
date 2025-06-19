import express from 'express';
import UserController from '../controllers/userController.js';
import { verifyToken } from '../services/authService.js';
import { authorizeSelf } from '../middlewares/authMiddleware.js';

const router = express.Router();

// CRUD Básico (heredado de BaseController)
router.get('/all', UserController.getAll)
router.put('/softDelete/:id', verifyToken,authorizeSelf, UserController.softDelete); // PUT /users/softDelete/:id
router.put('/profile/:id', verifyToken, authorizeSelf, UserController.updateUserProfile); // PATCH /users/settings/:id
router.post('/', UserController.create);  // POST /users

router.route('/:id')
    .all(verifyToken, authorizeSelf) // Middleware de autenticación
    .get(UserController.getOne)    // GET /users/:id
    .put(UserController.update)  // PATCH /users/:id
    .delete(UserController.delete); // DELETE /users/:id

export default router;