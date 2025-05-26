import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../config/config.js";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { Rate } from 'antd';
import { Loading } from './index.js';

function Review({ listing, reviews }) {

  if (!listing || !listing.reviews) {
    return <div className="mx-auto mt-1 mb-8 px-6 flex flex-col w-4/5 md:w-1/2 h-full rounded-md items-start font-jakarta">Loading reviews...</div>;
  }
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user || null);
  // console.log(reviews);

  const openLoading = () => {
    setIsLoading(true);
  }

  const closeLoading = () => {
    setIsLoading(false);
  }

  const handleDelete = async (reviewId) => {
    openLoading();
    try {
      // console.log(reviewId);
      const response = await axios.delete(`${config.backendUrl}/listings/${listing._id}/reviews/${reviewId}`);
      if (typeof window !== "undefined" && window.location) {
        window.location.reload();  // Safe browser-only reload
      }
      closeLoading();
    } catch (error) {
      console.log("Error while deleting review :: ", error);
    }
  }

  if (reviews.length === 0) {
    return (
      <div className={`${!isAuthenticated && "mt-4"} mx-auto px-4 shadow-[0_0_2px_rgba(0,0,0,0.5)] py-4 md:px-6 flex flex-col w-9/10 md:w-4/5 lg:w-3/5 h-full rounded-t-md items-start font-jakarta`}>
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        <h2 className="text-lg text-gray-600">No reviews yet</h2>
      </div>
    );
  }

  return (
    <div className={`${!isAuthenticated && "mt-4"} mx-auto shadow-[0_0_2px_rgba(0,0,0,0.5)] py-4 md:px-6 px-4 flex flex-col w-9/10 md:w-4/5 lg:w-3/5 h-full rounded-t-md items-start font-jakarta`}>
      <h2 className="text-xl font-semibold mb-3">Reviews</h2>
      <div className="w-full min-h-full flex flex-col md:grid md:grid-cols-2 box-border gap-3">
        {reviews.map((review, index) => {
          return (
            <div key={review._id || index} className="w-full min-h-full bg-white shadow-[0_0_0.08rem_rgb(0,0,0)] box-border rounded-lg">
              <p className="p-2">Review by <span className="font-semibold">{reviews[index].author.username}</span></p>
              
              <hr className="w-full opacity-20" />
              <div className="w-full p-2">
              <Rate value={review.rating} disabled/>
                <p className="font-semibold mb-4">{review.comment}</p>
                {user && user._id === reviews[index].author._id ? <MdDelete className="text-2xl text-red-400 hover:text-red-500 cursor-pointer" onClick={() => handleDelete(review._id)} /> : null}                
              </div>
            </div>
          )
        })}
      </div>
      <Loading 
      isOpen={isLoading}
      onClose={closeLoading}
      />
    </div>
  );
}

export default Review;
