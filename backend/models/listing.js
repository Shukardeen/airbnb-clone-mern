import {Schema, model} from "mongoose";
import {Review} from "./models.js";

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: String,
    description: String,
    image: {
        type: Object,
        // set: (v) => v === "" ? "https://www.pexels.com/photo/modern-bathroom-design-in-santa-teresa-30767881/" : v,
        default: "https://www.pexels.com/photo/modern-bathroom-design-in-santa-teresa-30767881/"
    },
    category: String,
    typeOfPlace: [String],
    essentials: [String],
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

//mongoose post middleware to delete all reviews from reviews collections related to a listing when the listing is deleted
listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}})
    }
});

const Listing = model("Listing", listingSchema);

export default Listing;