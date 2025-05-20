import { Listing } from "../models/models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

//index route (showing all listings)
const index = async (req, res, next) => {
  const listings = await Listing.find({});
  res.json({listings});
};

//getting specific listing
const getListing = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  res.json({listing});
};

//creating new listing
const newListing = async (req, res, next) => {
  let {title, description, category, typeOfPlace, essentials, subTitle, price, location, country, owner} = req.body;
  typeOfPlace = JSON.parse(typeOfPlace);
  essentials = JSON.parse(essentials);
  let cloudinaryImageUrl = "";
  let publicId = "";
  if(req.file?.path) {      //uploading image to cloudinary
    const cloudRes = await uploadOnCloudinary(req.file.path);
    if(cloudRes?.secure_url) {
      cloudinaryImageUrl = cloudRes.secure_url;
      publicId = cloudRes.public_id;

      //remove the local uploaded file after cloudinary upload
      fs.unlinkSync(req.file.path);
    }
  }
  const listing = new Listing({
    title,
    description,
    category,
    typeOfPlace,
    essentials,
    subTitle,
    price,
    location,
    country,
    owner,
    image: {
      cloudinaryImageUrl,
      publicId
    }
  });
  
  await listing.save();
  res.json({listing: listing});
};

//update listing
const updateListing = async (req, res, next) => {
  const { id } = req.params;
  let { title, description, category, typeOfPlace, essentials, subTitle, price, location, country, owner } = req.body;
  typeOfPlace = JSON.parse(typeOfPlace);
  essentials = JSON.parse(essentials);
  
    // Find the existing listing
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    
    // Update basic fields
    listing.title = title;
    listing.description = description;
    listing.price = price;
    listing.location = location;
    listing.category = category;
    listing.subTitle = subTitle;
    listing.country = country;
    listing.typeOfPlace = typeOfPlace;
    listing.essentials = essentials;
    
    // If there's a new image, update it
    if (req.file?.path) {
      // Delete previous image from cloudinary if it exists
      if (listing.image?.publicId) {
        await cloudinary.uploader.destroy(listing.image.publicId);
      }
      
      // Upload new image
      const cloudRes = await uploadOnCloudinary(req.file.path);
      if (cloudRes?.secure_url) {
        listing.image = {
          cloudinaryImageUrl: cloudRes.secure_url,
          publicId: cloudRes.public_id
        };
        listing.imagePublicId = cloudRes.public_id;
        
        // Remove the local uploaded file
        fs.unlinkSync(req.file.path);
      }
    }
    
    // Save the updated listing
    await listing.save();
    res.json({listing});
};

//delete/destroy listing
const destroyListing = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndDelete(id);
  const public_id = listing.image.publicId;
  await cloudinary.uploader.destroy(public_id);
  res.status(200).json({status: 200, message: "listing deleted"});
};

export { index, getListing, newListing, updateListing, destroyListing };
