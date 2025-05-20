import React, { useState } from "react";
import { Button, Loading } from "./index";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { config } from "../config/config";
import { useSelector } from "react-redux";
import { FaUserLarge, FaLocationDot } from "react-icons/fa6";
import capitalizeName from "../utils/capitalizeName";

function Listing({ listing }) {
  if (!listing || !listing.image) {
    return <div className="mx-auto mt-1 mb-8 px-6 flex flex-col w-4/5 md:w-1/2 h-full rounded-md items-start font-jakarta">Loading...</div>;
  }
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const openLoading = () => {
    setIsLoading(true)
  }

  const closeLoading = () => {
    setIsLoading(false);
  }

  const handleEdit = () => {
    if (!isAuthenticated) {
      setError("Login to edit listing");
      return;
    }
    navigate(`/listings/${listing._id}/edit`);
  };

  const handleDelete = async () => {
    if (user._id !== listing.owner._id) {
      setError("You are not authorized to perform this operation");
      return;
    }
    openLoading();
    try {
      const response = await axios.delete(`${config.backendUrl}/listings/${listing._id}`, { withCredentials: true });
      // console.log("Delete response:", response.data);
      navigate("/");
      closeLoading();
      toast.success("Listing deleted successfully");
      // Force a hard navigation to home
      // window.location.href = "/";
    } catch (error) {
      console.log("Error details:", {
        message: error.message,
        response: error.response,
        status: error.response?.status
      });
      toast.error(error.response?.data?.message || "Failed to delete listing");
    }
  };

  return (
    <div className="listing shadow-[0_0_2px_rgba(0,0,0,0.5)] px-4 py-4 mx-auto flex flex-col w-9/10 md:w-3/5 h-full rounded-b-md items-center font-jakarta">
      {error && <p className="text-red-500 mb-2.5">{error}</p>}
      <p className="hidden md:block text-2xl ml-7 mb-2 font-semibold self-start">{listing.title}</p>
      <img
        src={listing.image?.cloudinaryImageUrl}
        alt="listing image"
        className="w-2xl h-56 md:h-80 object-cover rounded-sm shadow shadow-black "
      />
      <div className="w-full max-w-2xl mt-4 bg-white space-y-3">
        {/* Title & Subtitle */}
        <div>
          <p className="text-xl md:hidden font-semibold">{listing.title}</p>
          <p className="text-lg md:text-2xl font-bold">{listing.subTitle}</p>
          <p className="text-gray-700">{listing.description}</p>
        </div>

        {/* Type & Essentials */}
        <div className="space-y-1">
          {listing.typeOfPlace.length > 0 && (
            <p>
              <span className="font-semibold">Type of place:</span>{" "}
              <span>{listing.typeOfPlace.join(", ")}</span>
            </p>
          )}
          {listing.essentials.length > 0 && (
            <p>
              <span className="font-semibold">Essentials:</span>{" "}
              <span>{listing.essentials.join(", ")}</span>
            </p>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-800">
          <FaLocationDot className="text-lg" />
          <p className="ml-2 font-medium">{listing.location}, {listing.country}</p>
        </div>

        {/* Owner Info */}
        <div className="flex items-center text-gray-800">
          <FaUserLarge className="text-lg" />
          <p className="ml-2">Listed by <span className="font-semibold">{capitalizeName(listing.owner.username)}</span></p>
        </div>

        {/* Price */}
        <p className="text-xl font-semibold text-black">
          ₹{listing.price.toLocaleString("en-IN")}/-
        </p>

        {/* Action Buttons */}
        {user && user._id === listing.owner._id && (
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-200 mt-4">
            <Button
              value="Edit"
              handleClick={handleEdit}
              className="bg-black text-white hover:bg-transparent hover:text-black border border-black transition-all duration-300"
            />
            <Button
              value="Delete"
              type="submit"
              handleClick={handleDelete}
              className="bg-red-500 text-white hover:bg-transparent hover:text-red-500 border border-red-500 transition-all duration-300"
            />
          </div>
        )}
      </div>


      <Loading
        isOpen={isLoading}
        onClose={closeLoading}
      />
    </div>
  );
}

export default Listing;
