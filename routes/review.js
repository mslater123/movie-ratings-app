// routes/review.js
const express = require('express');
const router = express.Router();
const { reviews } = require('../../models/movie');

router.get('/submit-review', (req, res) => {
    res.render('submit-review');
});

router.post('/submit-review', (req, res) => {
    const { movieId, reviewer, rating, comment } = req.body;
    const newReview = { reviewer, rating: parseInt(rating, 10), comment };

    if (!reviews[movieId]) {
        reviews[movieId] = [];
    }

    reviews[movieId].push(newReview);
    res.redirect(`/movie/${movieId}`);
});

module.exports = router;
