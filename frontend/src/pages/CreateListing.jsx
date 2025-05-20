import React, { useEffect, useState } from "react";
import { Button, Loading } from "../components/index";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { config } from "../config/config";
import { useSelector } from "react-redux";

function CreateListing() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const titles = ['Amazing Views', 'Arctic', 'Beachfront', 'Bed & breakfasts', 'Cabins', 'Camping', 'Castles', 'Caves', 'Farms', 'Historical homes', 'Islands', 'Lakefront', 'Rooms', 'Treehouse', 'Trending']

  const openLoading = () => {
    setIsLoading(true)
  }

  const closeLoading = () => {
    setIsLoading(false);
  }

  const onSubmit = async (formData) => {
    openLoading();
    const listingData = new FormData();
    listingData.append("title", formData.title);
    listingData.append("subTitle", formData.subTitle);
    listingData.append("description", formData.description);
    listingData.append("category", formData.category);
    listingData.append("price", formData.price);
    listingData.append("location", formData.location);
    listingData.append("country", formData.country);
    listingData.append("owner", user._id);
    listingData.append("image", formData.image[0]);
    listingData.append("typeOfPlace", JSON.stringify(formData.typeOfPlace));
    listingData.append("essentials", JSON.stringify(formData.essentials));

    try {
      const response = await axios.post(
        `${config.backendUrl}/listings`,
        listingData, { withCredentials: true }
      );
      closeLoading();
      // console.log(response.data);
      navigate(`/listings/${response.data["listing"]._id}`);
      toast.success("Listing created successfully");
      setError(null);
    } catch (error) {
      console.error("Error creating listing:", error);
      setError(error.response?.data?.message || "Failed to create listing");
    }
  };

  return (
    <div className="w-full flex justify-center min-h-full font-jakarta">
      <div className="w-full md:w-3xl flex items-center flex-col md:my-5 px-7 md:p-5 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-md">
        {isAuthenticated ? null : <p className="w-full text-center py-3 rounded-sm text-red-500 mb-2.5 border-1 border-red-500 bg-red-100 mt-5 md:mb-3
      ">Must login to create listing</p>}
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
            Create New Listing
          </h1>
        </div>
        <div className="form w-full">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="title mt-3">
              <label htmlFor="title" className="font-semibold">Title: </label>
              <br />
              <input
                type="text"
                id="title"
                placeholder="Enter title"
                className="h-10 border-1 mt-[0.1rem] shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
                {...register("title", {
                  required: { value: true, message: "Title is required" },
                })}
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="subTitle mt-3">
              <label htmlFor="subTitle">Sub Title: </label>
              <br />
              <input
                type="text"
                id="subTitle"
                placeholder="Enter sub title"
                className="h-10 border-1 mt-[0.1rem] shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
                {...register("subTitle", {
                  required: { value: true, message: "Sub title is required" },
                })}
              />
              {errors.subTitle && (
                <p className="text-red-500">{errors.subTitle.message}</p>
              )}
            </div>
            <div className="description mt-3">
              <label htmlFor="description">Description: </label>
              <br />
              <textarea
                placeholder="Enter description"
                id="description"
                className="border-1 mt-[0.1rem] shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
                rows="3"
                {...register("description", {
                  required: { value: true, message: "Description is required" },
                })}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div className="image mt-3">
              <label htmlFor="imageUrl">Upload Listing Image: </label>
              <br />
              <input
                type="file"
                id="imageUrl"
                accept="image/*"
                className="file:h-10 file:bg-gray-300 file:py-1 file:px-2 file:cursor-pointer file:mr-2 h-10 border-1 shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)] mt-[0.1rem]"
                {...register("image", {
                  required: { value: true, message: "Image is required" },
                })}
              />
              {errors.image && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </div>
            <div className="category mt-5">
              <label htmlFor="category">Choose listing category: </label>
              <br />
              <select
                id="category"
                defaultValue="#"
                className="h-10 border-1 mt-[0.1rem] shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
                {...register("category", {
                  required: { value: true, message: "Category is required" },
                })}
              >
                <option value="#" disabled>Select a category</option>
                {titles.map((title, index) => (
                  <option value={title} key={index} className="font-jakarta">{title}</option>
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
            <div className="price mt-3">
              <label htmlFor="price">Price: </label>
              <br />
              <input
                type="number"
                id="price"
                placeholder="Enter price per night"
                className="h-10 border-1 mt-[0.1rem] shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
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
            <div className="origin w-full md:flex items-center gap-4 mt-2 pb-6 border-b-1 border-gray-300">
              <div className="country w-full md:w-1/2">
                <div className="country mt-3">
                  <label htmlFor="country">Country: </label>
                  <br />
                  <input
                    type="text"
                    id="country"
                    placeholder="Enter country"
                    className="h-10 border-1 mt-[0.1rem] shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
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
                <div className="location mt-3">
                  <label htmlFor="location">Location: </label>
                  <br />
                  <input
                    type="text"
                    id="location"
                    placeholder="Enter location"
                    className="h-10 border-1 mt-[0.1rem] shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
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
            <div className='w-full py-4 flex items-center justify-between'>
              <Button
                type="reset"
                className={`${isAuthenticated ? "border-1 border-gray-300 px-3 py-2 rounded-md cursor-pointer" : "bg-gray-600 text-white"}`}
                value="Reset"
                disabled={isSubmitting || !isAuthenticated}
              />
              <Button
                type="submit"
                className={`${isAuthenticated ? "px-3 py-2 rounded-md bg-[#FF4A5F] text-white cursor-pointer hover:bg-[#ff385c]" : "bg-gray-600"} text-white`}
                value={isSubmitting ? "Creating" : "Create"}
                disabled={isSubmitting || !isAuthenticated}
              />
            </div>
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

export default CreateListing;
