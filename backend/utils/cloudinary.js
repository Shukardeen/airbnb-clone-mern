import dotenv from "dotenv";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

dotenv.config({path: path.resolve(process.cwd(), ".env")}); //loading env variables

//cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Upload an image
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "ListingImages"
    });
    //file has been uploaded successfully
    return response;
  } catch (error) {
    console.log("Cloudinary upload failed :: ", error);
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload option got failed
    return null;
  }
};

export { uploadOnCloudinary };
