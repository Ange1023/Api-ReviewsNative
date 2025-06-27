import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({

    tmdb_id: { 
        type: Number, 
        required: [true, 'El ID de TMDb es obligatorio'], 
        unique: true,
        min: [1, 'El ID de TMDb debe ser mayor que 0']
    },
    title: { 
        type: String, 
        required: [true, 'El título es obligatorio'],
        minlength: [1, 'El título no puede estar vacío'],
        maxlength: [200, 'El título no puede exceder 200 caracteres']
    },
    synopsis: { 
        type: String,
        maxlength: [2000, 'La sinopsis no puede exceder 2000 caracteres']
    },
    release_date: { 
        type: String,
        validate: {
        validator: function(v) {
            // Permite vacío o formato YYYY-MM-DD
            return !v || /^\d{4}-\d{2}-\d{2}$/.test(v);
        },
        message: props => `${props.value} no es una fecha válida (YYYY-MM-DD)`
        }
    },
    runtime: { 
        type: Number,
        min: [1, 'La duración debe ser mayor que 0'],
        max: [1000, 'La duración no puede exceder 1000 minutos']
    },
    poster_path: { 
        type: String,
    },

    categories: {
        default: [],
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
            required: [false, 'Categories are required'],
    },

    cast:{
        default: [],
        type: [
            {
                name: {
                    type: String,
                    required: [false, 'El nombre del actor/actriz es obligatorio'],
                    minlength: [1, 'El nombre no puede estar vacío'],
                    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
                },
                role: {
                    type: String,
                    required: [false, 'El rol del actor/actriz es obligatorio'],
                    minlength: [1, 'El rol no puede estar vacío'],
                    maxlength: [100, 'El rol no puede exceder 100 caracteres']
                },
            }
        ],
    },

    user_rating: { 
        type: Number, 
        default: 0,
        min: [0, 'La calificación de usuario no puede ser negativa'],
        max: [100, 'La calificación de usuario no puede ser mayor que 5']
    },
    critic_rating: { 
        type: Number, 
        default: 0,
        min: [0, 'La calificación de críticos no puede ser negativa'],
        max: [100, 'La calificación de críticos no puede ser mayor que 5']
    },
    total_rating: { 
        type: Number, 
        default: 0,
        min: [0, 'La calificación total no puede ser negativa'],
        max: [100, 'La calificación total no puede ser mayor que 5']
    },

    created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Movie", movieSchema);