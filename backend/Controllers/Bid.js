import mongoose from "mongoose";
import Bid from "../Models/Bid.js";
import sellercarregistrationModel from "../Models/sellercarresgistration.js";
import nodemailer from "nodemailer";
import User from "../Models/User.js";
import dotenv from "dotenv";
dotenv.config();

// Function to send email to the car owner
const sendBidNotificationEmail = async (ownerEmail, carDetails, bidderName, bidValue) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user:"pyandakhanyt@gmail.com",
      pass:"mgedmoymxhzrqcnk", // Use App Password from Gmail
    },
  });

  const messageContent = `
    <p>Dear Car Owner,</p>
    <p>You have received a new bid of <strong>${bidValue}</strong> for your car <strong>${carDetails}</strong> from ${bidderName}.</p>
    <p>Thank you for listing your car with us. We will keep you updated with further developments.</p>
    <p>Best Regards,<br>Your Auction Team</p>
  `;

  await transporter.sendMail({
    from: '"AutoBid" <pyandakhanyt@gmail.com>',
    to: ownerEmail,
    subject: "New Bid Received for Your Car",
    html: messageContent,
  });
};

export const placeBid = async (req, res) => {
  try {
    console.log("Request Reached to Backend Controller Try");
    console.log(req.body);
    const { carId, bidValue } = req.body;

    if (!req.user || !req.user._id) {
      return res
        .status(403)
        .json({ message: "User ID is required for registration" });
    }

    const bidderId = req.user._id;

    // Validate request data
    if (!carId || !bidderId || !bidValue) {
      console.log("Please provide all necessary details.");
      return res
        .status(400)
        .json({ message: "Please provide all necessary details." });
    }

    // Check the car owner
    const car = await sellercarregistrationModel.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }
    if (car.userId.toString() === bidderId) {
      console.log("You cannot place a bid on your own car!");
      return res
        .status(400)
        .json({ message: "You cannot place a bid on your own car!" });
    }

    // Get the current highest bid for the car
    const highestBid = await Bid.findOne({ "bid.carid": carId }).sort({ "bid.amount": -1 });

    // Ensure highestBid and highestBid.bid exist before accessing amount
    if (highestBid && highestBid.bid && highestBid.bid.amount >= bidValue) {
      return res.status(400).json({ message: "Your bid must be higher than the current highest bid." });
    }

    // Find the car owner's email
    const carOwner = await User.findById(car.userId);
    if (!carOwner || !carOwner.email) {
      return res.status(404).json({ message: "Car owner not found or email missing." });
    }

    // Get bidder's name
    const bidder = await User.findById(bidderId);
    if (!bidder || !bidder.name) {
      return res.status(404).json({ message: "Bidder not found or name missing." });
    }

    // Create a new bid with estimated value from the car registration
    const newBid = new Bid({
      bid: {
        carid: new mongoose.Types.ObjectId(carId), // Convert to ObjectId if necessary
        bidder: new mongoose.Types.ObjectId(bidderId),
        amount: bidValue,
        estimatedValue: car.estimatedvalue, // Store the current estimated value in the bid
      },
    });

    // Save the new bid
    await newBid.save();

    // Update the car registration with the new bid and estimated value
    await sellercarregistrationModel.findOneAndUpdate(
      { _id: carId },
      { 
        $push: { bids: newBid._id }, // Add the bid to the car's bid array
        $set: { estimatedvalue: bidValue } // Update the car's estimated value with the new bid value
      }
    );

    // Send email notification to the car owner
    const carDetails = `${car.brand} ${car.model} ${car.variant} (${car.color})`;
    const bidderName = bidder.name;
    await sendBidNotificationEmail(carOwner.email, carDetails, bidderName, bidValue);

    return res
      .status(201)
      .json({ message: "Bid placed successfully", bid: newBid });
  } catch (error) {
    console.error("Error placing bid:", error); // Log the complete error for better debugging
    return res.status(500).json({ message: "Internal server error" });
  }
};

const sendNotificationEmail = async (email, carDetails, bidAmount) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "pyandakhanyt@gmail.com",
      pass:  "mgedmoymxhzrqcnk", // Use App Password from Gmail
    },
  });

  const messageContent = `
    <p>Dear User,</p>
    <p>Congratulations! Your bid of <strong>${bidAmount}</strong> on the car <strong>${carDetails}</strong> has been accepted.</p>
    <p>Thank you for participating in our auction. We will contact you shortly with the next steps.</p>
    <p>Best Regards,<br>Your Auction Team</p>
  `;

  await transporter.sendMail({
    from: `"AutoBid" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Bid Accepted - Congratulations!",
    html: messageContent,
  });
};

export const acceptBid = async (req, res) => {
  try {
    const { carId, bidId } = req.body;
    console.log("Accepting bid for car ID:", carId, "and bid ID:", bidId);

    // Find the accepted bid
    const acceptedBid = await Bid.findById(new mongoose.Types.ObjectId(bidId));
    if (!acceptedBid) {
      return res.status(404).json({ message: "Bid not found." });
    }

    // Update the status of the accepted bid
    acceptedBid.bid.status = "Accepted";
    await acceptedBid.save();

    // Reject all other bids for the same car
    await Bid.updateMany(
      {
        "bid.carid": carId,
        _id: { $ne: bidId }, // Exclude the accepted bid
      },
      { $set: { "bid.status": "Rejected" } }
    );

    // Find the car details
    const car = await sellercarregistrationModel.findById(
      new mongoose.Types.ObjectId(carId)
    );
    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }

    // Update car status
    car.status = "Unavailable"; // Update this line based on your requirements
    await car.save();

    // Find the user's email associated with the accepted bid
    const user = await User.findById(acceptedBid.bid.bidder);
    if (!user || !user.email) {
      return res.status(404).json({ message: "User not found or email missing." });
    }

    // Send notification email
    const carDetails = `${car.brand} ${car.model} ${car.variant} (${car.color})`;
    const bidAmount = acceptedBid.bid.amount;

    await sendNotificationEmail(user.email, carDetails, bidAmount);

    return res.status(200).json({
      message: "Bid accepted, notification sent, and all other bids rejected.",
      acceptedBid,
    });
  } catch (error) {
    console.error("Error accepting bid:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAcceptedBids = async (req, res) => {
  try {
    const userId = req.user._id;
    const acceptedBids = await Bid.find({
      "bid.bidder": userId,
      "bid.status": "Accepted",
    });

    const rejectedBids = await Bid.find({
      "bid.bidder": userId,
      "bid.status": "Rejected",
    });

    const pendingBids = await Bid.find({
      "bid.bidder": userId,
      "bid.status": "Pending",
    });

    // Combine all bids into one array
    const allBids = [...acceptedBids, ...rejectedBids, ...pendingBids];

    // Return the bids found or an empty array if none
    return res.status(200).json(allBids);
  } catch (error) {
    console.error("Error fetching bids:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
