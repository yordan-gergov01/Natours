const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('./../models/tourModel.js');
const User = require('./../models/userModel.js');
const Booking = require('./../models/bookingModel.js');
const catchAsync = require('../utils/catchAsync.js');

const {
  getOne,
  getAll,
  createOne,
  deleteOne,
  updateOne,
} = require('./handleFactory.js');

const getCheckoutSession = catchAsync(async function (req, res, next) {
  // 1) Get the currently booked tour
  const bookedTour = await Tour.findById(req.params.tourId);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // success_url: `${req.protocol}://${req.get('host')}/?tour=${
    //   req.params.tourId
    // }&user=${req.user.id}&price=${bookedTour.price}`,

    success_url: `${req.protocol}://${req.get('host')}/my-tours?alert=booking`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${bookedTour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    mode: 'payment',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${bookedTour.name} Tour`,
            description: bookedTour.summary,
            images: [
              `http://www.natours.dev/img/tours/${bookedTour.imageCover}`,
            ],
          },
          unit_amount: bookedTour.price * 100, // Цената в центове
        },
      },
    ],
  });
  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

// const createBookingCheckout = catchAsync(async function (req, res, next) {
//   // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
//   const { tour, user, price } = req.query;

//   if (!tour && !user && !price) return next();

//   await Booking.create({ tour, user, price });

//   res.redirect(req.originalUrl.split('?')[0]);
// });

const createBookingCheckout = async function (session) {
  const tour = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price =
    session.line_items && session.line_items.length > 0
      ? session.line_items[0].amount / 100
      : 0;

  await Booking.create({ tour, user, price });
};

const webhookCheckout = function (req, res, next) {
  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    createBookingCheckout(event.data.object);
  }

  res.status(200).json({ received: true });
};

const getAllBookings = getAll(Booking);
const getBooking = getOne(Booking);
const createNewBooking = createOne(Booking);
const updateBooking = updateOne(Booking);
const deleteBooking = deleteOne(Booking);

module.exports = {
  getCheckoutSession,
  // createBookingCheckout,
  getAllBookings,
  getBooking,
  createNewBooking,
  updateBooking,
  deleteBooking,
  webhookCheckout,
};
