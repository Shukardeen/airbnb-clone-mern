import Joi from "joi";

//listing schema
const listingSchema = Joi.object({
  title: Joi.string().required(),
  subTitle: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  typeOfPlace: Joi.string().required(),
  essentials: Joi.string().required(),
  price: Joi.number().min(0).required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  owner: Joi.string().required(),
  image: Joi.any() // Allow image to be optional or any format for multer
});

//review schema
const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
    author: Joi.string().required()
  }).required()
});

export { listingSchema, reviewSchema };
