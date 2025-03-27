import UserModel from '../Models/User.js'; // Import your User model
import sellercarregistrationModel from '../Models/sellercarresgistration.js';
import Bid from '../Models/Bid.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

// Configure multer for avatar upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/avatars'); // Ensure this directory exists or handle dynamically
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// Fetch user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await UserModel.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user._id;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true } // Ensures validators are applied on update
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

// Update user password
export const updateUserPassword = async (req, res) => {
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

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password', error: error.message });
  }
};

// Upload user avatar
export const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user._id;
    const avatarPath = `/uploads/avatars/${req.file.filename}`; // Ensure req.file is handled

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
};

// Delete user profile

export const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    // Delete the user
    await UserModel.findByIdAndDelete(userId);

    // Delete cars registered by the user
    const userCars = await sellercarregistrationModel.find({ userId });

    // Remove the bids related to the user's cars
    const carIds = userCars.map((car) => car._id);

    // Delete bids associated with the user's cars
    await Bid.deleteMany({ "bid.carid": { $in: carIds } });

    // Delete the user's cars
    await sellercarregistrationModel.deleteMany({ userId });

    // Delete bids placed by the user
    await Bid.deleteMany({ "bid.bidder": userId });

    res.status(200).json({ message: "Profile and associated data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", error: error.message });
  }
};


// Export all functions
export default {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
//   uploadAvatar: [upload.single('avatar'), uploadAvatar],
  deleteUserProfile,
};
