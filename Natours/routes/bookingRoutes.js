const express = require('express');

const {
  getCheckoutSession,
  getAllBookings,
  getBooking,
  createNewBooking,
  updateBooking,
  deleteBooking,
} = require('./../controllers/bookingController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.use(protect);

router.get('/checkout-session/:tourId', getCheckoutSession);

router.use(restrictTo('admin', 'lead-guide'));

router.route('/').get(getAllBookings).post(createNewBooking);

router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking);

module.exports = router;
