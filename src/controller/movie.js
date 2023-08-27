import express from 'express';
import { v4 as uuid } from 'uuid';
import Movie from '../database/models.js';
import { movieData } from '../database/constant.js';
import { validateAdd, validateId } from '../middleware/movie.js';

const movieRouter = express.Router();
const errorMessage = 'Internal server error';

movieRouter.get('/list', async (_req, res) => {
    try {
        const movies = await Movie.find();
        console.log(movies);
        res.json({ data: movies, message: 'Movies fetched' });
    } catch (error) {
        res.status(500).json({ message: errorMessage });
    }
});

movieRouter.post('/add', validateAdd, async (req, res) => {
    try {
        const imdbid = uuid();
        const movieParams = req.body;

        const newMovie = new Movie({ ...movieParams, imdbid });
        const savedMovie = await newMovie.save();

        savedMovie ?
            res.status(201).json({ message: 'Movie added' }) :
            res.status(500).json({ message: errorMessage });
    } catch (error) {
        res.status(500).json({ message: errorMessage });
    }
});

movieRouter.post('/bulk/add', async (_req, res) => {
    try {
        const insertedMovies = await Movie.insertMany(movieData);

        insertedMovies ?
            res.status(201).json({ message: `${insertedMovies.length} movie/movies added` }) :
            res.status(500).json({ message: errorMessage });
    } catch (error) {
        res.status(500).json({ message: errorMessage });
    }
});

movieRouter.put('/edit/:id', validateId, async (req, res) => {
    try {
        const movieId = req.movieId;
        const updatedData = req.body;

        const updatedMovie = await Movie.findByIdAndUpdate(movieId, updatedData);

        updatedMovie ?
            res.status(200).json({ message: 'Movie edited' }) :
            res.status(404).json({ message: 'Movie not found' });
    } catch (error) {
        res.status(500).json({ error: errorMessage });
    }
});

movieRouter.delete('/delete/:id', validateId, async (req, res) => {
    try {
        const movieId = req.movieId;
        const deletedMovie = await Movie.findByIdAndDelete(movieId);

        deletedMovie ?
            res.status(200).json({ message: 'Movie deleted' }) :
            res.status(404).json({ error: 'Movie not found' });
    } catch (error) {
        res.status(500).json({ error: errorMessage });
    }
});

movieRouter.delete('/bulk/delete', async (_req, res) => {
    try {
        const { deletedCount, acknowledged } = await Movie.deleteMany();
        acknowledged ?
            res.status(200).json(`${deletedCount} movies deleted`) :
            res.status(500).json({ message });;
    } catch (error) {
        res.status(500).json({ error: errorMessage });
    }
});

export default movieRouter;
