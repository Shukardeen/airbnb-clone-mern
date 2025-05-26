import React, { useState } from "react";
import { Button, Loading } from "./index.js";
import { useForm } from "react-hook-form";
import axios from "axios";
import { config } from "../config/config.js";
import { useSelector } from "react-redux";
import { Rate } from 'antd';

function ReviewInput({ listing }) {
  // console.log(listing._id);
  const user = useSelector((state) => state.auth.user);
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const openLoading = () => {
    setIsLoading(true);
  }

  const closeLoading = () => {
    setIsLoading(false);
  }

  const onSubmit = async (data) => {
    // console.log(data);
    openLoading();
    const reviewData = {
      review: {
        comment: data.comment,
        rating: rating,
        author: user._id
      },
    };

    try {
      const response = await axios.post(
        `${config.backendUrl}/listings/${listing._id}/reviews`,
        reviewData, { headers: { "Content-Type": "application/json" } }
      );
      if (typeof window !== "undefined" && window.location) {
        window.location.reload();  // Safe browser-only reload
      }
      closeLoading();
    } catch (error) {
      console.log("Error in submitting review :: ", error);
    }
  };

  return (
    <div className="w-9/10 md:w-4/5 lg:w-3/5 md:px-7 mx-auto flex min-h-full flex-col justify-center items-start font-jakarta my-4 px-4 py-4 box-border rounded-md shadow-[0_0_2px_rgba(0,0,0,0.5)]">
      <p className="text-xl mb-2 font-bold">Leave a review</p>
      <p className="text-lg mb-2.5">Rating</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Rate 
          defaultValue={2.5} 
          allowClear={false} 
          tooltips={[1, 2, 3, 4, 5]} 
          onChange={(value) => setRating(value)}
        />

        <textarea
          name="comments"
          id="comments"
          placeholder="Write a review..."
          className={`w-full h-28 border-1 shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 focus:outline-none rounded-sm p-2.5 mt-2.5 ${errors.comment && "border-red-500"
            }`}
          {...register("comment", {
            required: { value: true, message: "Comment is required" },
          })}
        ></textarea>
        {errors.comment && (
          <p className="text-red-500">{errors.comment.message}</p>
        )}

        <Button
          type="submit"
          value={isSubmitting ? "Submitting..." : "Submit"}
          className="h-9 px-3 bg-black text-white rounded-sm hover:bg-transparent hover:text-black hover:shadow-[0_0_10px_rgba(33,58,124,0.5)] transition-all duration-300 cursor-pointer"
          disabled={isSubmitting}
        />
      </form>
      <Loading
      isOpen={isLoading}
      onClose={closeLoading} 
      />
    </div>
  );
}

export default ReviewInput;
