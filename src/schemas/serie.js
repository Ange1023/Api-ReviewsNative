import mongoose from "mongoose";

const serieSchema = new mongoose.Schema({

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
    first_air_date: {
        type: String,
        validate: {
            validator: function(v) {
                // Permite vacío o formato YYYY-MM-DD
                return !v || /^\d{4}-\d{2}-\d{2}$/.test(v);
            },
            message: props => `${props.value} no es una fecha válida (YYYY-MM-DD)`
        }
    },
    last_air_date: {
        type: String,
        validate: {
            validator: function(v) {
                // Permite vacío o formato YYYY-MM-DD
                return !v || /^\d{4}-\d{2}-\d{2}$/.test(v);
            },
            message: props => `${props.value} no es una fecha válida (YYYY-MM-DD)`
        }
    },
    
    seasons_count: {
        type: Number,
        min: [1, 'El número de temporadas debe ser al menos 1'],
        max: [100, 'El número de temporadas no puede exceder 100']
    },
    episodes_count: {
        type: Number,
        min: [1, 'El número de episodios debe ser al menos 1'],
        max: [10000, 'El número de episodios no puede exceder 10000']
    },

    poster_path: { 
        type: String
    },

    categories: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    },

    cast:{
        type: [
            {
                name: {
                    type: String,
                    minlength: [1, 'El nombre no puede estar vacío'],
                    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
                },
                role: {
                    type: String,
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

serieSchema.virtual('comments_count', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'serie_id',
    count: true
});

serieSchema.set('toObject', { virtuals: true });
serieSchema.set('toJSON', { virtuals: true });

export default mongoose.model("Serie", serieSchema);