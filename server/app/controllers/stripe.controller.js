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
          success_url: process.env.APP_URL + "/app/success",
          cancel_url: process.env.APP_URL + "/app/cancel",

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
      refresh_url: process.env.APP_URL + `/app`,
      return_url: process.env.APP_URL + `/app/onboard?account_id=${account.id}`,
    });

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
  }).exec((err, user) => {
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
        console.log("onboard", user);
        res.status(200).send({ message: "used id added" });
      });
    }
  });
};

const getUserProducts = async (req, res) => {
  User.findOne({
    email: req.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      if (user.stripe_account_id) {
        Stripe.products.list(
          {
            stripeAccount: user.stripe_account_id,
          },
          async (err, products) => {
            if (err) {
              console.error(err);
              return;
            }

            // Fetch prices for each product

            await Stripe.prices.list(
              {
                stripeAccount: user.stripe_account_id,
              },
              (err, prices) => {
                if (err) {
                  console.error(err);
                  return;
                }

                let productsWithPrices = products.data.map((product) => {
                  return {
                    ...product,
                    prices: prices.data.filter(
                      (price) => price.product === product.id
                    ),
                  };
                });
                res.status(200).send({
                  message: "Product List",
                  data: productsWithPrices,
                });
              }
            );
          }
        );
      } else {
        res.status(201).send({ message: "There is no account connected" });
      }
    }
  });
};

const getUserSubscription = async (req, res) => {
  User.findOne({
    email: req.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      if (user.stripe_account_id) {
        Stripe.subscriptions.list(
          {
            stripeAccount: user.stripe_account_id,
          },
          (err, subscription) => {
            if (err) {
              console.error(err);
              res.status(500).send({ message: "Someting wrong" });
              return;
            }

            // Process the products from the connected account

            res
              .status(200)
              .send({ message: "User Subscriptions", data: subscription });
          }
        );
      } else {
        res.status(201).send({ message: "There is no account connected" });
      }
    }
  });
};

function deleteConnectedAccount(accountId, res) {
  Stripe.accounts.del(accountId, (err, confirmation) => {
    if (err) {
      res.status(500).json({ error: `Error deleting account ` });
      return;
    }

    res.status(200).json({ message: `Deleted account ` });
  });
}

const deleteAllAccount = async (req, res) => {
  Stripe.accounts.list({}, (err, accounts) => {
    if (err) {
      console.error(err);
      return;
    }

    // Loop through the list of connected accounts and delete each one
    accounts.data.forEach((account) => {
      deleteConnectedAccount(account.id, res);
    });
  });
};

module.exports = {
  addNewCustomer,
  getCustomerByID,
  createSession,
  onBoardUser,
  addOnBoardUsertoDB,
  getUserProducts,
  getUserSubscription,
  deleteAllAccount,
};
