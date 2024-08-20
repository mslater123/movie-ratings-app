const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { Movie, Review } = require('./models/movie');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movie-ratings-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

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
    res.status(500).send('Error retrieving movies');
  }
});

app.get('/movie/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
    const movie = await Movie.findById(movieId);
    const movieReviews = await Review.find({ movieId: movieId });

    if (movie) {
      res.render('movie-detail', { movie: movie, reviews: movieReviews });
    } else {
      res.status(404).send('Movie not found');
    }
  } catch (err) {
    res.status(500).send('Error retrieving movie details');
  }
});

app.get('/submit-review', (req, res) => {
  res.render('submit-review');
});

app.post('/submit-review', async (req, res) => {
  const { movieId, reviewer, rating, comment } = req.body;
  const newReview = new Review({ movieId, reviewer, rating, comment });

  try {
    await newReview.save();
    res.redirect(`/movie/${movieId}`);
  } catch (err) {
    res.status(500).send('Error submitting review');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
