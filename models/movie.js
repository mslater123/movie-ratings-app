const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Review schema
const reviewSchema = new Schema({
  movieId: { type: Schema.Types.ObjectId, ref: 'Movie' },
  reviewer: String,
  rating: Number,
  comment: String
});

// Define the Movie schema
const movieSchema = new Schema({
  title: { type: String, required: true },
  thumbnail: String,
  rating: Number,
  description: String,
  reviews: [reviewSchema] // Embedding an array of reviews
});

// Create models
const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie };
