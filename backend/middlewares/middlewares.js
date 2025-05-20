import { listingSchema, reviewSchema } from "../joiSchemas/joiSchemas.js";
import { ExpressError } from "../utils/index.js";
import path from "path";
import multer from "multer";

//validate listing middleware
const validateListing = (req, res, next) => {
  if(req.is('multipart/form-data') && !req.file) {
    return next();
  }
  
  let { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

//validate review middleware
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    console.log(error);
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//multer middleware
const __dirname = path.resolve();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export { validateListing, validateReview, upload };
