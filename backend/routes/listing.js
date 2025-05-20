import express from "express";
import { wrapAsync } from "../utils/index.js";
import { validateListing } from "../middlewares/middlewares.js";
import { upload } from "../middlewares/middlewares.js"
import {
  index,
  getListing,
  newListing,
  updateListing,
  destroyListing,
} from "../controllers/listings.js";

const listingRouter = express.Router();

//index route (showing all listings) and create listing route
listingRouter
  .route("/")
  .get(wrapAsync(index))
  .post(upload.single("image"), validateListing, wrapAsync(newListing));

//getting specific listing, updating and deleting listing routes
listingRouter
  .route("/:id")
  .get(wrapAsync(getListing))
  .put(upload.single("image"), validateListing, wrapAsync(updateListing))
  .delete(wrapAsync(destroyListing));

export default listingRouter;
