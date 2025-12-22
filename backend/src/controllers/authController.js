import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmailVerification } from "../config/nodemailer.js";

const generateToken = (id, email, name) => {
  return jwt.sign({ _id: id, email, name }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const generateCode = () => {
  return Math.floor(Math.random() * 100000);
};

export const sendEmailVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user && user.verified) {
      return res.json({
        message: "user with this email already exists",
        success: false,
      });
    }
    if (user) {
      const code = generateCode();
      user.verificationCode = code;
      await user.save();
      await sendEmailVerification(email, code);
      res.json({ success: true, message: "email verification code sent" });
    }
    if (!user) {
      const code = generateCode();
      await User.create({
        email,
        name: "new user name",
        password: "new user password",
        verificationCode: code,
        verified: false,
      });
      await sendEmailVerification(email, code);
      res.json({ message: "email verification code sent" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmailCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    // if (user && user.verified) {
    //   return res.json({
    //     message: "user with this email already exists",
    //     verified: false,
    //   });
    // }
    if (user && user.verificationCode == code) {
      return res.json({ verified: true });
    } else {
      return res.json({ verified: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const changeEmail = async (req, res) => {
  try {
    const { email, newEmail } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found" });
    }
    user.email = newEmail;
    await user.save();
    res.json({ message: "Email changed successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "enter all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Error" });
    }
    user.verified = true;
    user.name = name;
    user.verificationCode = null;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    const token = generateToken(user._id, user.email, user.name);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.email, user.name);
    // const toekn = generateToken(user._id)

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0),
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};

export const getProfile = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json(null);
  }
  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    res.json(userData);
  } catch (error) {
    res.json(null);
  }
};
