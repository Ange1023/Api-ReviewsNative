import mongoose from 'mongoose';


const commentSchema = new mongoose.Schema({

    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
    },
    serie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Serie',
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500, 
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
} , { timestamps: true });

commentSchema.pre('validate', function(next) {
    if (!this.movie_id && !this.serie_id) {
        this.invalidate('movie_id', 'Debe asociar el comentario a una película o serie');
        this.invalidate('serie_id', 'Debe asociar el comentario a una película o serie');
    }
    if (this.movie_id && this.serie_id) {
        this.invalidate('movie_id', 'No puede asociar el comentario a ambos, película y serie');
        this.invalidate('serie_id', 'No puede asociar el comentario a ambos, película y serie');
    }
    next();
});

export default mongoose.model('Comment', commentSchema);