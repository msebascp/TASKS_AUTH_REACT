import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  console.log(email, password, username);
  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["The email already exists"]);
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash
    });
    console.log(newUser);
    const savedUser = await newUser.save();
    const token = await createAccessToken({ id: savedUser._id });
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true
    });
    res.json({
      message: "User created successfully",
      data: savedUser
    });
  } catch (error) {
    res.status(500).json({
      message: "error.message"
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });
    const token = await createAccessToken({ id: user._id });
    res.cookie("token", token);
    res.json({
      message: "User login successfully",
      user: user
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0)
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(400).json({ message: "User not found" });
  return res.json({
    user
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unathorized" });
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });
    return res.json({
      id: userFound.id,
      user: userFound
    });
  });
};
