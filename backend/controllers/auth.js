import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import cors from 'cors'

export const register = async (req, res, next) => {
  const { username, email, password ,city, country,phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log(username)
  console.log(email)
  console.log(country)
  console.log(city)
  console.log(phone)
  console.log(password)

  if (!username || !email || !country || !city || !password || !phone) {
    return res.status(400).json({ message: "Username and email are required" });
  }
  // Adding user to database
  try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
          return res.status(400).json({ message: "User Already Exists!" });
      }

      const newUser = new User({ username, email, password: hashedPassword , city, country, phone});
      newUser.save();
      res.status(200).send('User Registered successfully!');
  }
  catch (error) {
      return res.status(400).json({ message: error });
  }
};

export const logout = async (req,res,next) => {
  try {
    // Clear the access_token cookie to log the user out
    res.clearCookie("access_token");

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
