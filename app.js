const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { Movie } = require('./models/movie');

const app = express();
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render('index', { movies: movies });
  } catch (err) {
    console.error('Error retrieving movies:', err);
    res.status(500).send('Error retrieving movies');
  }
});

app.get('/movie/:id', async (req, res) => {
  const movieId = req.params.id;

  // Ensure the movieId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).send('Invalid movie ID');
  }

  try {
    const movie = await Movie.findById(movieId).exec();

    if (movie) {
      res.render('movie-detail', { movie: movie });
    } else {
      res.status(404).send('Movie not found');
    }
  } catch (err) {
    console.error('Error retrieving movie details:', err);
    res.status(500).send('Error retrieving movie details');
  }
});

app.get('/submit-review', (req, res) => {
  res.render('submit-review');
});

app.post('/submit-review', async (req, res) => {
    const { movieTitle, reviewer, rating, comment } = req.body;

    try {
        // Find the movie by title (or another unique field)
        const movie = await Movie.findOne({ title: movieTitle });

        if (!movie) {
            return res.status(404).send('Movie not found');
        }

        // Use the movie's _id to create the review
        movie.reviews.push({ reviewer, rating, comment });
        await movie.save();

        res.redirect(`/movie/${movie._id}`);
    } catch (err) {
        console.error('Error submitting review:', err);
        res.status(500).send('Error submitting review');
    }
});


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/movie-ratings-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
