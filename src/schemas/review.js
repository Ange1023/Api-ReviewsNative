import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({

    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
    },
    serie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Serie',
    },
    score: {
        type: Number,
        required: [true, 'La calificación es obligatoria'],
        min: 1,
        max: 5, 
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El ID de usuario es obligatorio'],
    },
}, {timestamps: true});

reviewSchema.pre('validate', function(next) {
    if (!this.movie_id && !this.serie_id) {
        this.invalidate('movie_id', 'Debe asociar la calificacion a una película o serie');
    }
    if (this.movie_id && this.serie_id) {
        this.invalidate('movie_id', 'No puede asociar la calificacion a ambos, película y serie');
        this.invalidate('serie_id', 'No puede asociar la calificacion a ambos, película y serie');
    }
    next();
});

reviewSchema.index(
    { user_id: 1, movie_id: 1 },
    { unique: true, partialFilterExpression: { movie_id: { $exists: true } } }
);

reviewSchema.index(
    { user_id: 1, serie_id: 1 },
    { unique: true, partialFilterExpression: { serie_id: { $exists: true } } }
);

export default mongoose.model('Review', reviewSchema);
