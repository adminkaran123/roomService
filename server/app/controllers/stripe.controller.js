const stripe = require("stripe");
const db = require("../models");
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const User = db.user;

const Stripe = stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

const createCheckoutSession = async (customerID, price) => {
  const session = await Stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer: customerID,
    line_items: [
      {
        price,
        quantity: 1,
      },
    ],
    subscription_data: {
      trial_period_days: process.env.TRIAL_DAYS,
    },

    success_url: `${process.env.DOMAIN}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.DOMAIN}`,
  });

  return session;
};

const createBillingSession = async (customer) => {
  const session = await Stripe.billingPortal.sessions.create({
    customer,

    return_url: "https://localhost:4242",
  });
  return session;
};

const addNewCustomer = async (email) => {
  const customer = await Stripe.customers.create({
    email,
    description: "New Customer",
  });
  return customer;
};

const getCustomerByID = async (id) => {
  const customer = await Stripe.customers.retrieve(id);
  return customer;
};

const createWebhook = (rawBody, sig) => {
  const event = Stripe.webhooks.constructEvent(
    rawBody,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );
  return event;
};

const createSession = (req, res) => {
  console.lo;
  User.findOne({
    email: req.email,
  }).exec(async (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      const session = await Stripe.checkout.sessions.create(
        {
          mode: "subscription",
          payment_method_types: ["card"],
          line_items: [
            {
              price: req.body.priceId,
              quantity: 1,
            },
          ],
          success_url: "http://localhost:3000/articles",
          cancel_url: "http://localhost:3000/article-plans",
          customer: user.stripe_id,
        },
        {
          apiKey: STRIPE_SECRET_KEY,
        }
      );
      res.status(200).send(session);
    }
  });
};

module.exports = {
  addNewCustomer,
  getCustomerByID,
  createSession,
};
