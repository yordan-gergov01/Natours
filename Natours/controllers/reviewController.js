const Review = require('./../models/reviewModel');
// const catchAsync = require('./../utils/catchAsync');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handleFactory.js');

const setTourUserIds = function (req, res, next) {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

const getAllReviews = getAll(Review);
const getReview = getOne(Review);
const createNewReview = createOne(Review);
const deleteReview = deleteOne(Review);
const updateReview = updateOne(Review);

module.exports = {
  getAllReviews,
  createNewReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
};
