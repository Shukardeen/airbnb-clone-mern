import dotenv from "dotenv";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { ExpressError } from "./utils/index.js";
import { listingRouter, reviewRouter, userRouter } from "./routes/routes.js";
import cookieParser from "cookie-parser";

dotenv.config({path: path.resolve(process.cwd(), ".env")}); //loading env variables

const port = 3000;
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//connecting with database
main()
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("Error while connecting to database :: ", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

//home route
app.get("/", (req, res) => {
  res.send("You are on home page.");
  // console.log(req.session);
});

//routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/auth", userRouter);

//page not found error
app.all("*", (req, res, next) => {
  return next(new ExpressError(404, "Page not found!"));
});

//error handling middleware
app.use((error, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = error;
  res.status(status).send(message);
});

//starting the server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});