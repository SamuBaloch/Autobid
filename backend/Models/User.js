import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Ensures email is stored in lowercase
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Ensures a minimum password length
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
    minlength: 13, // For CNIC validation
    maxlength: 13,
  },
  isVerified: {
    type: Boolean,
    default: false, // Default to false until verified
  },
  verificationToken: {
    type: String,
    default: null, // Optional: Used for email verification
  },
  tokenExpiry: {
    type: Date,
    default: null, // Expiration time for the verification token
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically stores the creation date
  },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
