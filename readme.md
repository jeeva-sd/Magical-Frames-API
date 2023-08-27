# Movie Recommendation Platform API
This project is an API backend for a movie recommendation platform. It is built using Express.js and interacts with a MongoDB database to manage movie data.

## Installation
1. Clone the repository:
git clone https://github.com/jeeva-sd/Magical-Frames-API

2. Navigate to the project directory:
cd Magical-Frames-API 

3. Install the dependencies:
npm install

4. Create a `.env` file in the root directory and add your MongoDB connection URL

5. Start the server:
npm start

The API will be running on `http://localhost:3000`.

## API Routes

### `GET /movie/list`
Get a list of all movies.

### `POST /movie/add`
Add a new movie.

### `POST /movie/bulk/add`
Add multiple movies in bulk.

### `PUT /movie/edit/:id`
Edit an existing movie by ID.

### `DELETE /movie/delete/:id`
Delete a movie by ID.

### `DELETE /movie/bulk/delete`
Delete all movies in bulk.

## Middleware
The following middleware functions are used to validate and process requests:
- `validateAdd`: Validates the request body for adding a new movie.
- `validateId`: Validates the `id` parameter in the request URL.

## Examples
Here are some example requests using `curl`:

# Get a list of all movies
curl http://localhost:3000/movie/list

# Add a new movie
curl -X POST -H "Content-Type: application/json" -d '{"title": "New Movie", "genre": "Action", "year": 2023}' http://localhost:3000/movie/add

# Edit an existing movie
curl -X PUT -H "Content-Type: application/json" -d '{"title": "Updated Movie"}' http://localhost:3000/movie/edit/:id

# Delete a movie
curl -X DELETE http://localhost:3000/movie/delete/:id