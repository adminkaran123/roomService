const db = require("../models");
const Tour = db.tour;

const { ObjectId } = require("mongodb");

exports.createAndUpdateTour = async (req, res) => {
  const userId = req.userId;
  const tourData = req.body.tour_data;

  try {
    // Check if a tour related to the user already exists
    const existingTour = await Tour.findOne({ user_id: userId });

    if (existingTour) {
      // Update the existing tour
      await Tour.findOneAndUpdate({ user_id: userId }, { tour_data: tourData });
      res.status(200).send({ message: "Tour Updated Successfully!" });
    } else {
      // Create a new tour if none exists
      const newTour = new Tour({
        user_id: userId,
        tour_data: tourData,
      });

      await newTour.save();
      res.status(200).send({ message: "Tour Created Successfully!" });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "An error occurred while processing the request.",
    });
  }
};

exports.getUserTour = (req, res) => {
  Tour.findOne({
    user_id: req.userId,
  }).exec(function (err, tour) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({
        message: "Tour Fetched",
        data: tour?.tour_data ? JSON.parse(tour.tour_data) : null,
      });
    }
  });
};
