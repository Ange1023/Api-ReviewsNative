import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'], 
        unique: true,
        match: [/.+@.+\..+/, 'Invalid email format'], 
    },
    profileImage: {
        default: 'https://i.postimg.cc/J7KRWYkV/chad.jpg', // URL por defecto
        type: String,
        validate: {
            validator: function (url) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(url); // Validación de URL de imagen
            },
            message: 'ProfileImage must be a valid URL ending with .jpg, .jpeg, .png, or .gif',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'], 
        // minLength: [6, 'Password must be at least 6 characters long'], // El deber ser
    },
    name: {
        type: String,
        required: [true, 'Name is required'], 
        minlength: [2, 'Name must be at least 2 characters long'], // Longitud mínima
        maxlength: [50, 'Name must not exceed 50 characters'], // Longitud máxima
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        minlength: [2, 'Last Name must be at least 2 characters long'], // Longitud mínima
        maxlength: [50, 'Last Name must not exceed 50 characters'], // Longitud máxima
    },
    createdGroups: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
        validate: {
            validator: function (groups) {
                return Array.isArray(groups);
            },
            message: 'CreatedGroups must be an array of Group IDs',
        },
    },
    followedGroups: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
        validate: {
            validator: function (groups) {
                return Array.isArray(groups);
            },
            message: 'FollowedGroups must be an array of Group IDs',
        },
    },
    favoriteRecipes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
        validate: {
            validator: function (recipes) {
                return Array.isArray(recipes);
            },
            message: 'FavoriteRecipes must be an array of Recipe IDs',
        },
    },

    followers: {
        default: [],
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        validate: {
            validator: function (users) {
                return Array.isArray(users);
            },
            message: 'Followers must be an array of User IDs',
        },
    },

    following: {
        default: [],
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        validate: {
            validator: function (users) {
                return Array.isArray(users);
            },
            message: 'Following must be an array of User IDs',
        },
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        validate: {
            validator: function (date) {
                return !date || date instanceof Date;
            },
            message: 'DeletedAt must be a valid date',
        },
    },
});
export default mongoose.model('User', userSchema);