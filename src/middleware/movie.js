export const validateAdd = (req, res, next) => {
    const requiredFields = ['imageurl', 'genre', 'imdbrating', 'released', 'type', 'synopsis', 'title', 'favorite'];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ error: `${field} is required` });
        }
    }

    next();
};

export const validateId = (req, res, next) => {
    const movieId = req.params.id;
    if (!movieId) {
        return res.status(400).json({ error: 'Movie ID is missing' });
    }

    req.movieId = movieId;
    next();
};