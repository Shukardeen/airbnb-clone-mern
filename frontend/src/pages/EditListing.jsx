import React, { useEffect, useState } from "react";
import { Button, Loading } from "../components/index";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { config } from "../config/config";
import { useSelector } from "react-redux";

function EditListing() {
  const { id } = useParams();
  const [existingListing, setExistingListing] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const titles = ['Amazing Views', 'Arctic', 'Beachfront', 'Bed & breakfasts', 'Cabins', 'Camping', 'Castles', 'Caves', 'Farms', 'Historical homes', 'Islands', 'Lakefront', 'Rooms', 'Treehouse', 'Trending']

  const onSubmit = async (formData) => {
    openLoading();
    try {
      // Check if user is listing owner
      if (user && user._id !== existingListing.owner._id) {
        setError("You don't have permission to edit this listing");
        return;
      }

      // Create FormData object for multipart/form-data submission
      const listing = new FormData();
      listing.append("title", formData.title);
      listing.append("description", formData.description);
      listing.append("category", formData.category);
      listing.append("subTitle", formData.subTitle);
      listing.append("price", formData.price);
      listing.append("location", formData.location);
      listing.append("country", formData.country);
      listing.append("owner", user._id);
      listing.append("typeOfPlace", JSON.stringify(formData.typeOfPlace));
      listing.append("essentials", JSON.stringify(formData.essentials));
      
      // Only append image if a new one is selected
      if (formData.image && formData.image[0]) {
        listing.append("image", formData.image[0]);
      }
      
      const response = await axios.put(
        `${config.backendUrl}/listings/${id}`,
        listing,
        { 
          withCredentials: true,
          headers: { 
            "Content-Type": "multipart/form-data" 
          } 
        }
      );
      closeLoading();
      navigate(`/listings/${id}`);
      toast.success("Listing updated successfully");
      setError(null);
    } catch (error) {
      console.error("Error updating listing:", error);
      setError(error.response?.data?.message || "Failed to edit listing");
    }
  };

  const openLoading = () => {
    setIsLoading(true);
  }

  const closeLoading = () => {
    setIsLoading(false);
  }

  const getListing = async () => {
    try {
      const response = await axios.get(`${config.backendUrl}/listings/${id}`);
      setError(null);
      setExistingListing(response.data.listing);
      reset(response.data.listing);
    } catch (error) {
      console.log("Error fetching listing :: ", error);
      setError(error.response?.data?.message || "Failed to fetch listing");
    }
  };

  useEffect(() => {
    if (id) {
      getListing();
    }
  }, [id]); // Added id dependency to useEffect

  return (
    <div className="w-full flex justify-center min-h-full font-jakarta">
      <div className="w-full md:w-3xl flex items-center flex-col md:my-5 px-7 pb-5 md:p-5 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-md">
        {isAuthenticated ? null : <p className="w-full text-center py-3 rounded-sm text-red-500 mb-2.5 border-1 border-red-500 bg-red-100 mt-5 md:mb-3
      ">Must login to edit listing</p>}
        {error && (
          <div
            className="w-full text-center py-3 rounded-sm text-red-500 mb-2.5 border-1 border-red-500 bg-red-100 md:mb-3"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="heading w-full">
          <h1 className="text-2xl font-bold">
            Edit Listing
          </h1>
        </div>
        <div className="form w-full">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="title my-3">
              <label htmlFor="title">Title: </label>
              <br />
              <input
                type="text"
                placeholder="Enter title"
                className="h-10 border-1 shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
                {...register("title", {
                  required: { value: true, message: "Title is required" },
                })}
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="subTitle my-3">
              <label htmlFor="subTitle" className="mb-2">Sub Title: </label>
              <br />
              <input
                type="text"
                id="subTitle"
                placeholder="Enter sub title"
                className="h-10 border-1 shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
                {...register("subTitle", {
                  required: { value: true, message: "Sub title is required" },
                })}
              />
              {errors.subTitle && (
                <p className="text-red-500">{errors.subTitle.message}</p>
              )}
            </div>
            <div className="description my-1.5">
              <label htmlFor="description">Description: </label>
              <br />
              <textarea
                placeholder="Enter description"
                className="border-1 shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 py-1 w-full my-1 focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
                rows="3"
                {...register("description", {
                  required: { value: true, message: "Description is required" },
                })}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div className="image my-1.5">
              <label htmlFor="imageUrl">Upload New Image &#40;Optional&#41;: </label>
              <br />
              <input
                type="file"
                accept="image/*"
                className="file:h-10 file:bg-gray-300 file:py-1 file:px-2 file:cursor-pointer file:mr-2 h-10 border-1 shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
                name="image"
                {...register("image")}
              />
              {existingListing.image && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Current image:</p>
                  <img 
                    src={existingListing.image.cloudinaryImageUrl} 
                    alt="Current listing" 
                    className="w-24 h-24 object-cover mt-1 rounded"
                  />
                </div>
              )}
            </div>
            <div className="category my-3">
              <label htmlFor="category">Choose listing category: </label>
              <br />
              <select
                id="category"
                defaultValue="#"
                className="h-10 border-1 mt-1.5 shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
                {...register("category", {
                  required: { value: true, message: "Category is required" },
                })}
              >
                <option value="#" disabled>Select a category</option>
                {titles.map((title, index) => (
                  <option value={title} key={index} className="font-jakarta text-lg box-border">{title}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>
            <div className="typeOfPlace mt-3">
              <label htmlFor="typeOfPlace">Type of place: </label>
              <br />
              <div className='w-full p-3 bg-gray-50 flex justify-around items-center border-1 border-gray-400 rounded-sm mt-[0.1rem]'>
                <div className='flex justify-center items-center gap-2'>
                  <input 
                    type="checkbox" 
                    id='room' 
                    value="room"
                    {...register("typeOfPlace")}
                  />
                  <label htmlFor="room">Room</label>
                </div>
                <div className='flex justify-center items-center gap-2'>
                  <input 
                    type="checkbox" 
                    id='entireHome' 
                    value="entireHome"
                    {...register("typeOfPlace")}
                  />
                  <label htmlFor="entireHome">Entire Home</label>
                </div>
                <div className='flex justify-center items-center gap-2'>
                  <input 
                    type="checkbox" 
                    id='anyType' 
                    value="other"
                    {...register("typeOfPlace")}
                  />
                  <label htmlFor="anyType">Other</label>
                </div>
              </div>
            </div>
            <div className="essentials mt-3">
              <label htmlFor="essentials">Essentials: </label>
              <br />
              <div className='w-full py-3 bg-gray-50 flex justify-around items-center border-1 border-gray-400 rounded-sm'>
                <div className='flex justify-center items-center gap-2'>
                  <input 
                    type="checkbox" 
                    id='wifi' 
                    value="wifi"
                    {...register("essentials")}
                  />
                  <label htmlFor="wifi">WiFi</label>
                </div>
                <div className='flex justify-center items-center gap-2'>
                  <input 
                    type="checkbox" 
                    id='pool' 
                    value="pool"
                    {...register("essentials")}
                  />
                  <label htmlFor="pool">Pool</label>
                </div>
                <div className='flex justify-center items-center gap-2'>
                  <input 
                    type="checkbox" 
                    id='parking' 
                    value="parking"
                    {...register("essentials")}
                  />
                  <label htmlFor="parking">Parking</label>
                </div>
              </div>
            </div>
            <div className="price my-1.5">
              <label htmlFor="price">Price: </label>
              <br />
              <input
                type="number"
                placeholder="Enter price per night"
                className="h-10 border-1 shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
                min="0"
                {...register("price", {
                  required: { value: true, message: "Price is required" },
                  min: { value: 0, message: "Price cannot be negative" },
                })}
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>
            <div className="origin w-full md:flex items-center gap-4 mb-2.5">
              <div className="country w-full md:w-1/2">
                <div className="country my-1.5">
                  <label htmlFor="country">Country: </label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter country"
                    className="h-10 border-1 shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
                    {...register("country", {
                      required: { value: true, message: "Country is required" },
                    })}
                  />
                  {errors.country && (
                    <p className="text-red-500">{errors.country.message}</p>
                  )}
                </div>
              </div>
              <div className="location w-full md:w-1/2">
                <div className="location my-1.5">
                  <label htmlFor="location">Location: </label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="h-10 border-1 shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
                    {...register("location", {
                      required: {
                        value: true,
                        message: "Location is required",
                      },
                    })}
                  />
                  {errors.location && (
                    <p className="text-red-500">{errors.location.message}</p>
                  )}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className={`${isAuthenticated ? "bg-black border-1 hover:bg-transparent hover:text-black transition-all duration-300" : "bg-gray-600"}  text-white`}
              value={isSubmitting ? "Updating..." : "Update"}
              onClick={openLoading}
              disabled={isSubmitting || !isAuthenticated}
            />
          </form>
        </div>
      </div>

      <Loading 
      isOpen={isLoading}
      onClose={closeLoading}
      />
    </div>
  );
}

export default EditListing;