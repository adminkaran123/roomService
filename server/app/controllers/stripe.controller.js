const stripe = require("stripe");
const db = require("../models");
require("dotenv").config();
const User = db.user;

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const Stripe = stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

const plans = {
  monthly: "price_1OKcLcD6BMgDnsI2erpK1Utj",
  yearly: "price_1OKcMeD6BMgDnsI2DtgdZXS2",
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

const endpointSecret = "we_1OE5rRD6BMgDnsI25ltV1WEd";
const createWebHook = (request, response) => {
  const sig = request.headers["whsec_H9lGbT4M81ER2RNqdir23M2YvWcfgMHl"];

  let event;

  try {
    event = Stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log("err", err);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      console.log("paymentIntentSucceeded", paymentIntentSucceeded);
      break;
    // ... handle other event types
    case "account.updated":
      const accountUpdatedSucceeded = event.data.object;
      var connectedAccountId = event.account;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    case "account.application.deauthorized":
      const application = event.data.object;
      var connectedAccountId = event.account;
      break;
    case "customer.subscription.updated":
      //started trial
      // const user = await UserService.getUserByBillingID(data.customer)
      var data = event.data.object;
      console.log("data", data);

      User.findOne({
        stripe_id: data.customer,
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (user) {
          if (data.plan.id == plans.monthly) {
            user.plan = "monthly";
          } else if (data.plan.id == plans.yearly) {
            user.plan = "yearly";
          }

          const isOnTrial = data.status === "trialing";

          if (isOnTrial) {
            user.hasTrial = true;
            user.endDate = new Date(data.current_period_end * 1000);
          } else if (data.status === "active") {
            user.hasTrial = false;
            user.endDate = new Date(data.current_period_end * 1000);
          }

          if (data.canceled_at) {
            // cancelled
            user.plan = "none";
            user.hasTrial = false;
            user.endDate = null;
          }

          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.status(200).send({ message: "used id added" });
          });
        }
      });

      //await user.save()
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
};

const createSession = (req, res) => {
  console.log("req", req.body.priceId);
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
          subscription_data: {
            trial_period_days: 15,
          },
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
  createWebHook,
};
