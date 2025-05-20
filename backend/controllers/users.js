import { User } from "../models/models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") }); //loading env variables

const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const createdUser = await User.create({
        username,
        email,
        password: hash,
      });

      //login after signup
      const token = jwt.sign({ email }, process.env.AUTH_SUPER_SECRET); //generating token
      res.cookie("token", token, {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //cookie expires after 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000, //maximum age of cookie i.e. 7 days
      });
      res.json({ message: "registration successful", createdUser });
    });
  });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) res.json({message: "something went wrong"});
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const token = jwt.sign({ email }, process.env.AUTH_SUPER_SECRET); //generating token to send to client browser
      res.cookie("token", token, {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //cookie expires after 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      res.json({ message: "Logged in successfully", user });
    } else {
      res.json({ message: "something went wrong" });
    }
  });
};

//logout user
const logoutUser = (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true
  });
  res.json({ message: "logged out successfully" });
};

//check user authentication status
const authStatus = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ authenticated: false });

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SUPER_SECRET);
    const user = await User.findOne({email: decoded.email});
    res.json({ authenticated: true, user });
  } catch (err) {
    res.json({ authenticated: false });
  }
};

export { signupUser, loginUser, logoutUser, authStatus };
