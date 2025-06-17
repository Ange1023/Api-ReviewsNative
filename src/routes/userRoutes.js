import express from 'express';
import UserController from '../controllers/userController.js';
import { verifyToken } from '../services/authService.js';

const router = express.Router();

// CRUD Básico (heredado de BaseController)
router.get('/all',UserController.getAll)
router.post('/favorite', UserController.toggleFavorite); // POST /users/favorite
router.post('/follow', UserController.toggleFollowUser); // POST /users/follow
router.get('/me/:id', UserController.getProfile); // GET /users/:id
router.put('/softDelete/:id', UserController.softDelete); // PUT /users/softDelete/:id
router.put('/profile/:id', UserController.updateUserProfile); // PATCH /users/settings/:id
router.route('/')
    .post(UserController.create);  // POST /users


router.route('/:id', verifyToken) // Middleware de autenticación
    .get(UserController.getOne)    // GET /users/:id
    .put(UserController.update)  // PATCH /users/:id
    .delete(UserController.delete); // DELETE /users/:id

export default router;