import moongose from 'mongoose';

const categorySchema = new moongose.Schema({

    tmdb_id: {
        type: Number,
        unique: true,
        min: [1, 'TMDB ID must be a positive integer'],
        max: [9999999, 'TMDB ID must not exceed 7 digits'],
    },
    type: {
        type: String,
        required: [true, 'Category type is required'],
        enum: {
            values: ['movie', 'serie','both'],
            message: 'Category type must be either "movie" or "tv"',
        },
    },
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        minlength: [2, 'Category name must be at least 2 characters long'],
        maxlength: [50, 'Category name must not exceed 50 characters'],
    },
});

export default moongose.model('Category', categorySchema);
