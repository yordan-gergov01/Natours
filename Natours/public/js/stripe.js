import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51QuC2TLSZMylGgIpKumNlYgcy2GOCrbCWCiPJmE6yrNRkwQYKxzrvnL5nm19Exigkbu9l2yG2XYOiq6pXOgjscp300Q4HO4iNY'
);

const bookTour = async function (tourId) {
  try {
    // 1) Get checkout session from API
    const response = await fetch(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    const session = await response.json();
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

module.exports = { bookTour };
