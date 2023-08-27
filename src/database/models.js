import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    imageurl: [String],
    genre: [String],
    imdbid: String,
    favorite: Boolean,
    title: String,
    imdbrating: Number,
    released: Number,
    type: String,
    synopsis: String
});

const MovieModel = mongoose.model('Movie', movieSchema);

export default MovieModel;