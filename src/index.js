import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import movieRoutes from '../src/controller/movie.js';
import MongoDBConnection from '../src/database/connection.js';

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/movie', movieRoutes);
app.get('/', (_req, res) => res.send('Magical Frames'));

const connectDatabase = () => {
    const database = new MongoDBConnection();
    database.getConnection();
};

app.listen(port, () => {
    connectDatabase();
    console.log(`Server is running on port ${port}`);
});
