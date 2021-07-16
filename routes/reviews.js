const express = require('express');
const router = express.Router({mergeParams: true});
const { validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Review = require('../models/review');
const {reviewSchema} = require('../schemas.js');
const Campground = require('../models/campground');
const reviews = require('../controllers/reviews')



router.post('/', validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId',isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))


module.exports = router;