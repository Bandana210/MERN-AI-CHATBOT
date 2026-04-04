import User from "../models/User.js";
import { hash, compare } from "bcrypt";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({
      message: "OK",
      name: user.name,
      email: user.email,
      password: user.password,
      id: user._id.toString(),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not registered" });
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    return res.status(200).json({
      message: "OK",
      name: user.name,
      email: user.email,
      password: user.password,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogout = async (req, res, next) => {
  try {
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};