import { Schema, model } from "mongoose";

//creating review schema
const reviewSchema = Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

//creating model for reviews
const Review = model("Review", reviewSchema);

export default Review;
