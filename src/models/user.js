import User from '../schemas/user.js';
import mongoose from 'mongoose';
import BaseModel from '../utils/baseModel.js';
import bcrypt from "bcrypt";

class userModel extends BaseModel {
    
    constructor() {
        super(User);
    }
    
    async createUser(userData) {
        return await User.create(userData);
    }

    async updateUser(userId, userData) {
        return await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userId) }, userData, { new: true, runValidators: true });
    }

    async softDeleteUser(userId) {
        return await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userId) }, { deletedAt: new Date() }, { new: true });
    }

    async deleteUser(userId) {
        return await User.findOneAndDelete({_id: new mongoose.Types.ObjectId(userId)  });
    }

    async getUserById(userId) {
        return await User.findById(userId);
    }
    async getAllUsers() {
        return await User.find();
    }

    async getOne(filter){
        return await User.findOne(filter);
    }

    async updateUserProfile(userId, userData) {
        const user = await User.findById(userId);
        if (!user) return null;


        if (userData.password && userData.newPassword) {

            const samePassword = await bcrypt.compare(userData.password, user.password);

            if (samePassword) {
                user.password = await bcrypt.hash(userData.newPassword, 10);
            }
        }

        if (userData.name) user.first_name = userData.name;
        if (userData.lastName) user.last_name = userData.lastName;
        if (userData.email) user.email = userData.email;
        if (userData.profileImage) user.avatar = userData.profileImage;
        if (userData.role) user.role = userData.role;
        if (userData.userName) user.user_name = userData.userName;
    
        return await user.save();
    }

}
export default new userModel();