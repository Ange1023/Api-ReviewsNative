import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'], 
        unique: true,
        match: [/.+@.+\..+/, 'Invalid email format'], 
    },
    avatar: {
        default: 'https://i.postimg.cc/MHw8VCDs/Captura-de-pantalla-2025-06-21-100631.png', // URL por defecto
        type: String,
        validate: {
            validator: function (url) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(url); // Validación de URL de imagen
            },
            message: 'Avatar must be a valid URL ending with .jpg, .jpeg, .png, or .gif',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'], 
        // minLength: [6, 'Password must be at least 6 characters long'], // El deber ser
    },
    first_name: {
        type: String,
        required: [true, 'Name is required'], 
        minlength: [2, 'Name must be at least 2 characters long'], // Longitud mínima
        maxlength: [50, 'Name must not exceed 50 characters'], // Longitud máxima
    },
    last_name: {
        type: String,
        required: [true, 'Last Name is required'],
        minlength: [2, 'Last Name must be at least 2 characters long'], // Longitud mínima
        maxlength: [50, 'Last Name must not exceed 50 characters'], // Longitud máxima
    },
    role: {
        type: String,
        enum: ['user', 'critic'], // Roles permitidos
        default: 'user', // Rol por defecto
        required: [true, 'Role is required'], // Rol es obligatorio
    },
    user_name:{
        type: String,
        required: [true, 'User Name is required'],
        unique: true, // Nombre de usuario único
        minlength: [3, 'User Name must be at least 3 characters long'], // Longitud mínima
        maxlength: [30, 'User Name must not exceed 30 characters'], // Longitud máxima
        match: [/^[a-zA-Z0-9_]+$/, 'User Name can only contain letters, numbers, and underscores'], // Validación de caracteres permitidos
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