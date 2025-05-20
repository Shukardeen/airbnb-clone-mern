import dotenv from "dotenv"
import path from "path"
import express from "express";
import { wrapAsync } from "../utils/index.js";
import {
  signupUser,
  loginUser,
  logoutUser,
  authStatus,
} from "../controllers/users.js";

dotenv.config({path: path.resolve(process.cwd(), ".env")});
const userRouter = express.Router();

//signup user
userRouter.post("/signup", wrapAsync(signupUser));

//login user
userRouter.post(
  "/login",
  wrapAsync(loginUser)
);

//logout user
userRouter.get("/logout", logoutUser);

//check user authentication status
userRouter.get("/status", authStatus);

export default userRouter;
