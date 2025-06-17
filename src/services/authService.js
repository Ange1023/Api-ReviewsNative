import UserModel from "../models/user.js";
import { AppError } from "../utils/appError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';

export function generateToken(payload){

    if (!payload) throw new AppError("Payload is required to generate token");

    const token = jwt.sign(payload, process.env.API_RECETAS_NATIVE_JWT_SECRET, { expiresIn: process.env.API_RECETAS_NATIVE_JWT_EXPIRES_IN });

    if(!token) throw new AppError("Token generation failed", 500);

    return token;

};

export function verifyToken(req, res, next){

    const token = req.header("authorization")?.replace("Bearer ", "");
    
    if (!token) throw new AppError("Token is required", 401);

    const decoded = jwt.verify(token, process.env.API_RECETAS_NATIVE_JWT_SECRET);
    req.user = decoded;
    next();
    
};

class authService {

    async signUp({ email, password, name, lastName, createdGroups, followedGroups, favoriteRecipes, profileImage  }) {

        const existingUser = await UserModel.getOne({ email });

        if (existingUser) throw new AppError("User already exists", 400);
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const data = await UserModel.createUser({
            email,
            password: hashedPassword,
            name,
            lastName,
            createdGroups: createdGroups || [],
            followedGroups: followedGroups || [],
            favoriteRecipes: favoriteRecipes || [],
            profileImage
        });
        
        if (!data) throw new AppError("User creation failed", 500);
        
        return data;
    }

    async signIn({email, password}) {

        if (!email || !password) throw new AppError("Email and password are required", 400);

        const user = await UserModel.getOne({ email });
        
        if (!user) throw new AppError("User not found", 404);
        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) throw new AppError("Invalid password", 401);

        if(user.deletedAt) throw new AppError("This user is deleted has account, if you want to recover it, please contact us", 401);
        
        const token = generateToken({ email: user.email });

        if (!token) throw new AppError("Token generation failed", 500);

        return {token, userId: user._id };

    }

    async signOut(req, res) {
        res.status(200).json({ message: "User signed out" });
    }

}

export default new authService();