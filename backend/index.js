import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import sellercarregistrationModel from "./Models/sellercarresgistration.js";
import AuthRouter from "./Routes/AuthRouter.js";
import BidRouter from "./Routes/Bid.js";
import ProductRouter from "./Routes/ProductRouter.js";
import CarRegistrationRouter from "./Routes/sellercarregistration.js";
import userprofieRouter from "./Routes/userprofile.js";
import UserModel from './Models/User.js';
import bcrypt from 'bcrypt';
import multer from 'multer';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51QYEXzRwAz4jWWzSUcRFevSpzT5ggoJLCvvAgZybZlfcuGO7lKvBjvPfRTgnVlPwpk5BH20yE9gq1xwSMGDcDUty00JA0dRhcZ');


dotenv.config();

// Create Express app
const app = express();

// MongoDB connection URL
const url =
 "mongodb+srv://arsal:123@autobid.upbhmp8.mongodb.net/?retryWrites=true&w=majority&appName=autobid";

// Connect to MongoDB
mongoose
  .connect(url)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection error:", err));

mongoose.set("strictQuery", true);

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/carRegistration", CarRegistrationRouter);
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use("/api/bids", BidRouter);
app.use("/userprofile", userprofieRouter);

// In your Express routes file
app.put("/api/carRegistration/:id/acceptBid", async (req, res) => {
  try {
    const { id } = req.params;
    const { bidId } = req.body; // Ensure this is coming in the request body

    // Validate that both the car ID and bid ID are provided
    if (!id || !bidId) {
      return res.status(400).send("Car ID and Bid ID are required");
    }

    // Find the car
    const car = await sellercarregistrationModel.findById(id);
    if (!car) {
      return res.status(404).send("Car not found");
    }

    // Check if the bidId exists in the car's bids
    const bidExists = car.bids.some((bid) => bid._id.toString() === bidId);
    if (!bidExists) {
      return res.status(400).send("Bid not found");
    }

    // Update each bid's status
    const updatedBids = car.bids.map((bid) => {
      if (bid._id.toString() === bidId) {
        return { ...bid, status: "Pending Payment" }; // Accepted bid
      }
      return { ...bid, status: "Rejected" }; // Rejected bids
    });

    // Update the car with new bids status
    await sellercarregistrationModel.findByIdAndUpdate(
      id,
      { $set: { bids: updatedBids } },
      { new: true }
    );

    res.status(200).json({ message: "Bid accepted successfully" });
  } catch (error) {
    console.error("Error accepting bid:", error); // Log the error for debugging
    res.status(500).send("Internal Server Error");
  }
});

// Define the port
const PORT = process.env.PORT || 8080;


app.put('/profile', async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id; // Assuming authentication middleware sets req.user

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// Update user password
app.put('/userprofile', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    console.log("Update user password successfully");
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password', error: error.message });
  }
});

// Configure multer for avatar upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avatars'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload user avatar
app.put('/api/user/avatar', upload.single('avatar'), async (req, res) => {
  try {
    const userId = req.user.id;
    const avatarPath = `/uploads/avatars/${req.file.filename}`;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { avatar: avatarPath },
      { new: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Avatar uploaded successfully', avatar: avatarPath });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading avatar', error: error.message });
  }
});

// Delete user profile
// app.delete('/api/user/profile', async (req, res) => {
//   try {
//     const userId = req.user._id;
//     await UserModel.findByIdAndDelete(userId);

//     res.status(200).json({ message: 'Profile deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting profile', error: error.message });
//   }
// });


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
      const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: 'pkr',
      });
      res.status(200).send({
          clientSecret: paymentIntent.client_secret,
      });
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
});