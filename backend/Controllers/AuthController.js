import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import UserModel from "../Models/User.js";

const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "pyandakhanyt@gmail.com",
      pass: "mgedmoymxhzrqcnk", // Use App Password if using Gmail
    },
  });

  const verificationLink = `http://localhost:8080/auth/verify?token=${token}`;
  await transporter.sendMail({
    from: '"AUTOBID" <pyandakhanyt@gmail.com>',
    to: email,
    subject: "Verify Your Email Address for AUTOBID",
    html: `
      <p>Hello,</p>
      <p>Thank you for registering with AUTOBID. To complete your registration and start placing bids, please verify your email address.</p>
      <p>Click the link below to verify your email:</p>
      <p><a href="${verificationLink}">Verify Your Email</a></p>
      <p>If you did not request this verification, please ignore this email.</p>
      <p>Best regards,<br/>The AUTOBID Team</p>
    `,
  });
  
};

export const signup = async (req, res) => {
  try {
    const { name, email, password,cnic,address } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, you can log in",
        success: false,
      });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = Date.now() + 3600 * 1000; // Token valid for 1 hour

    const hashedPassword = await bcrypt.hash(password, 10);

    const userModel = new UserModel({
      name,
      email,
      password: hashedPassword,
      cnic,
      isVerified: false,
      verificationToken,
      tokenExpiry,
    });

    await userModel.save();

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message: "Signup successful. Please verify your email to log in.",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// export const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = await UserModel.findOne({ email });
//     if (user) {
//       return res.status(409).json({
//         message: "User already exists, you can log in",
//         success: false,
//       });
//     }
//     const userModel = new UserModel({ name, email, password });
//     userModel.password = await bcrypt.hash(password, 10);
//     await userModel.save();
//     res.status(201).json({
//       message: "Signup successful",
//       success: true,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    const errorMsg = "Authentication failed: email or password is incorrect.";

    if (!user) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }

    // Check if the user is verified
    if (!user.isVerified) {
      return res.status(403).json({
        message:
          "Your email is not verified. Please verify your email to log in.",
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }

    const jwtToken = jwt.sign({ email: user.email, _id: user._id }, "thekhan", {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful.",
      success: true,
      jwtToken,
      email,
      name: user.name,
      id: user._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const user = await UserModel.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired verification token.",
        success: false,
      });
    }

    if (user.tokenExpiry < Date.now()) {
      return res.status(400).json({
        message: "Verification token has expired.",
        success: false,
      });
    }

    // Update user to verified
    user.isVerified = true;
    user.verificationToken = null; // Clear token
    user.tokenExpiry = null; // Clear expiry
    await user.save();

    res.status(200).json({
      message: "Email verified successfully! You can now log in.",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};
