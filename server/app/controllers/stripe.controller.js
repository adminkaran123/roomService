const stripe = require("stripe");
const db = require("../models");
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const User = db.user;

const Stripe = stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

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
          success_url: "https://formmaker.co.in/app/success",
          cancel_url: "https://formmaker.co.in/app/cancel",

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

const onBoardUser = async (req, res) => {
  try {
    const account = await Stripe.accounts.create({
      type: "standard",
    });

    const accountLink = await Stripe.accountLinks.create({
      type: "account_onboarding",
      account: account.id,
      refresh_url: `https://formmaker.co.in/app`,
      return_url: `https://formmaker.co.in/app/onboard?account_id=${account.id}`,
      //return_url: `http://localhost:5173/app/onboard?account_id=${account.id}`,
    });

    //res.redirect(accountLink.url);
    res.status(200).send({ url: accountLink.url });
  } catch (err) {
    console.log("err", err);
    res.status(500).send({
      error: err.message,
    });
  }
};

const addOnBoardUsertoDB = async (req, res) => {
  User.findOne({
    email: req.email,
  }).exec(async (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      user.stripe_account_id = req.body.account_id;
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });

          return;
        }
        res.status(200).send({ message: "used id added" });
      });
    }
  });
};

module.exports = {
  addNewCustomer,
  getCustomerByID,
  createSession,
  onBoardUser,
  addOnBoardUsertoDB,
};
