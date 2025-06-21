import moongose from 'mongoose';

const mediaIdSchema = new moongose.Schema({
    tmdb_id: {
        type: Number,
        required: [true, 'Media ID is required'],
        unique: true,
    },
    media_type: {
        type: String,
        enum: ['movie', 'serie'], 
        required: [true, 'Media type is required']
    }
}, {
    timestamps: true 
});

export default moongose.model("MediaId", mediaIdSchema);