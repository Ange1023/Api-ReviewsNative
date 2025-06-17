
import userService from "../services/userService.js";
import { catchAsync, sendResponse } from "../utils/appError.js";
class userController {
    
    create = catchAsync(async (req, res, next) => {
        const user = await userService.createUser(req.body);
        sendResponse(res, 201, "Usuario creado exitosamente", {
            user,
        });
    });

    update = catchAsync(async (req, res, next) => {
        const user = await userService.updateUser(req.params.id, req.body);
        if (!user) {
            return sendResponse(res, 404, "Usuario no encontrado", null);
        }
        sendResponse(res, 200, "Usuario actualizado exitosamente", {
            user,
        });
    });

    delete = catchAsync(async (req, res, next) => {
        await userService.deleteUser(req.params.id);
        if (!user) {
            return sendResponse(res, 404, "Usuario no encontrado", null);
        }
        sendResponse(res, 200, "Usuario eliminado exitosamente", null);
    });

    getOne = catchAsync(async (req, res, next) => {
        const user = await userService.getUserById(req.params.id);
        sendResponse(res, 200, "Usuario encontrado exitosamente", {
            user,
        });
    });

    getAll = catchAsync(async (req, res, next) => {
        const users = await userService.getAllUsers();
        sendResponse(res, 200, "Usuarios encontrados exitosamente", {
            users,
        });
    });

    toggleFavorite = catchAsync(async (req, res, next) => {
        const { recipeId, user_id } = req.body;
        const user = await userService.toggleFavorite(user_id, recipeId);
        if (!user) {
            return sendResponse(res, 404, "Usuario no encontrado", null);
        }
        sendResponse(res, 200, "Receta actualizada en favoritos exitosamente", {
            user,
        });
    });

    toggleFollowUser = catchAsync(async (req, res, next) => {
        const { target_user_id,current_user_id } = req.body;

        const user = await userService.toggleFollowUser(current_user_id, target_user_id);
        if (!user) {
            return sendResponse(res, 404, "Usuario no encontrado", null);
        }
        sendResponse(res, 200, "Usuario seguido/deseguido exitosamente", {
            user,
        });
    });

    getProfile = catchAsync(async (req, res, next) => {
        const user = await userService.getProfile(req.params.id);
        if (!user) {
            return sendResponse(res, 404, "Usuario no encontrado", null);
        }
        sendResponse(res, 200, "Perfil de usuario encontrado exitosamente", {
            user,
        });
    });

    updateUserProfile = catchAsync(async (req, res, next) => {
        const user = await userService.updateUserProfile(req.params.id, req.body);
        if (!user) {
            return sendResponse(res, 404, "Usuario no encontrado", null);
        }
        sendResponse(res, 200, "Configuración de usuario actualizada exitosamente", {
            user,
        });
    });
    
    softDelete = catchAsync(async (req, res, next) => {
        const user = await userService.softDeleteUser(req.params.id);
        if (!user) {
            return sendResponse(res, 404, "Usuario no encontrado", null);
        }
        sendResponse(res, 200, "Usuario eliminado exitosamente", {
            user,
        });
    });  

}

export default new userController();