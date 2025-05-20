import express from "express";
import { wrapAsync } from "../utils/index.js";
import { validateReview } from "../middlewares/middlewares.js";
import { postReview, destroyReview } from "../controllers/reviews.js";

const reviewRouter = express.Router({ mergeParams: true });

//post review route
reviewRouter.post("/", validateReview, wrapAsync(postReview));

//delete review route
reviewRouter.delete("/:reviewId", wrapAsync(destroyReview));

export default reviewRouter;
