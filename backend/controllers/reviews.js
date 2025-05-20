import { Listing, Review } from "../models/models.js";

//post new review
const postReview = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  const review = new Review(req.body.review);
  listing.reviews.push(review);
  await review.save();
  await listing.save();
  res.json({message: "review added successfully", review});
};

//delete/destroy review
const destroyReview = async (req, res, next) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  const review = await Review.findByIdAndDelete(reviewId);
  res.json({message: "review deleted successfully", review});
};

export { postReview, destroyReview };
