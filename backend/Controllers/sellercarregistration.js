import sellercarregistrationModel from "../Models/sellercarresgistration.js";
import Bid from "../Models/Bid.js";
import User from "../Models/User.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configure email notifications
const sendWinnerNotification = async (winnerEmail, carDetails) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // App Password
    },
  });

  const message = `
    <p>Congratulations!</p>
    <p>You have won the auction for the car: <strong>${carDetails}</strong>.</p>
    <p>Thank you for participating!</p>
  `;

  await transporter.sendMail({
    from: '"Car Auction" <your_email@gmail.com>',
    to: winnerEmail,
    subject: "Auction Result Notification",
    html: message,
  });
};

// Create a new car registration
export const createCarRegistration = async (req, res) => {
  try {
    const {
      name,
      estimatedvalue,
      brand,
      make,
      model,
      variant,
      chassisNumber,
      color,
      numberPlate,
      detaildescription,
      imageUrl,
      biddingDuration,
    } = req.body;

    const currentTime = new Date();
    const biddingEndTime = new Date(currentTime.getTime() + biddingDuration * 60 * 60 * 1000); // Add hours to current time

    // Calculate time left in milliseconds
    const timeLeft = biddingEndTime - currentTime;  // time difference in milliseconds

    // Optional: Convert time left to a human-readable format (hours, minutes, seconds)
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const newCar = new sellercarregistrationModel({
      userId: req.user._id,
      nameofoffering: name,
      estimatedvalue,
      brand,
      make,
      model,
      variant,
      chassisNumber,
      color,
      numberPlate,
      detaildescription,
      imageUrl,
      biddingDuration,
      biddingEndTime,
      timeLeft: `${hoursLeft} hours, ${minutesLeft} minutes, ${secondsLeft} seconds`, // Save timeLeft as a string
    });

    await newCar.save();
    res.status(201).json({
      success: true,
      car: newCar,
      timeLeft: `${hoursLeft} hours, ${minutesLeft} minutes, ${secondsLeft} seconds`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Place a bid
export const placeBid = async (req, res) => {
  try {
    const { carId, bidValue } = req.body;
    const userId = req.user._id;

    const car = await sellercarregistrationModel.findById(carId).populate("highestBid");

    if (new Date() > car.biddingEndTime) {
      return res.status(400).json({ message: "Bidding has ended for this car" });
    }

    if (car.highestBid && bidValue <= car.highestBid.amount) {
      return res.status(400).json({ message: "Bid is too low" });
    }

    const newBid = new Bid({
      carid: carId,
      bidder: userId,
      amount: bidValue,
    });

    await newBid.save();

    car.highestBid = newBid._id;
    await car.save();

    res.status(200).json({ message: "Bid placed successfully", car });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// End auction and notify the winner
export const endAuction = async (req, res) => {
  try {
    const { carId } = req.params;

    const car = await sellercarregistrationModel.findById(carId).populate("highestBid");

    if (new Date() < car.biddingEndTime) {
      return res.status(400).json({ message: "Auction is still ongoing" });
    }

    if (!car.highestBid) {
      return res.status(400).json({ message: "No bids were placed for this car" });
    }

    const winner = await User.findById(car.highestBid.bidder);

    car.status = "sold";
    car.winner = winner._id;
    await car.save();

    await sendWinnerNotification(winner.email, `${car.brand} ${car.model}`);

    res.status(200).json({ message: "Auction ended. Winner notified.", car });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get car registrations for a specific user
export const getCarRegistration = async (req, res) => {
  try {
    const userId = req.user._id;

    const cars = await sellercarregistrationModel.find({ userId }).populate({
      path: "bids",
      model: "Bid",
      select: "amount date status",
      populate: {
        path: "bidder",
        select: "name _id",
      },
    });

    // Add timeLeft dynamically for each car
    const carsWithTimeLeft = cars.map((car) => {
      const currentTime = new Date();
      const timeLeft = car.biddingEndTime - currentTime;  // time difference in milliseconds

      // If timeLeft is negative, the auction is over
      if (timeLeft < 0) {
        return {
          ...car.toObject(),
          timeLeft: "Auction ended",
        };
      }

      // Convert timeLeft to a human-readable format (hours, minutes, seconds)
      const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

      return {
        ...car.toObject(),
        timeLeft: `${hoursLeft} hours, ${minutesLeft} minutes, ${secondsLeft} seconds`,
      };
    });

    res.json(carsWithTimeLeft);
  } catch (error) {
    res.status(500).send("Error getting car registrations");
  }
};

// Get all car registrations
export const getCarRegistrationAll = async (req, res) => {
  try {
    const cars = await sellercarregistrationModel.find();
    res.json(cars);
  } catch (error) {
    res.status(500).send("Error getting car registrations");
  }
};

// Delete a specific car registration
export const deleteCarRegistration = async (req, res) => {
  try {
    const carId = req.params.id;
    const deletedCar = await sellercarregistrationModel.deleteOne({ _id: carId });

    if (deletedCar.deletedCount === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Car registration deleted", success: true });
  } catch (error) {
    res.status(500).send("Error deleting car registration");
  }
};
