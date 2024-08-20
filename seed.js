const mongoose = require('mongoose');
const { Movie } = require('./models/movie'); // Adjust the path as needed

// MongoDB URI
const mongoUri = 'mongodb://localhost:27017/movie-ratings-app';

// Connect to MongoDB and seed data
const seedDatabase = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing movie data
    await Movie.deleteMany({});

    // Define movie data
    const movies = [
      { title: 'Movie Title 1', thumbnail: '/placeholder.jpg', rating: 4, description: "Description for Movie Title 1" },
      { title: 'Movie Title 2', thumbnail: '/placeholder.jpg', rating: 5, description: "Description for Movie Title 2" },
      { title: 'Movie Title 3', thumbnail: '/placeholder.jpg', rating: 3, description: "Description for Movie Title 3" }
    ];

    // Insert movie data
    await Movie.insertMany(movies);
    console.log('Movies seeded successfully');

    // Disconnect from MongoDB
    mongoose.disconnect();
  } catch (err) {
    console.error('Error connecting to MongoDB or seeding data:', err);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();
