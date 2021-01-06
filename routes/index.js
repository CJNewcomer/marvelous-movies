var express = require('express');
var router = express.Router();

const { User, Movie, Review } = require('../db/models')
const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next)

/* GET home page. */
router.get('/', asyncHandler(async(req, res, next) => {
  const topMovies = await Movie.findAll({where: Movie.voteRating > 4, limit: 5});
  const recentReviews = await Review.findAll({ include: Movie, order: Review.updatedAt, limit: 5})
  
  res.render('index', {topMovies, recentReviews, title: 'Welcome to Marvelous Movies!' });
}));

module.exports = router;
