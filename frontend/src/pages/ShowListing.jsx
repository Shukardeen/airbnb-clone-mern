import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Listing, ReviewInput, Review, Map } from "../components/index.js";
import { config } from "../config/config.js";
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function ShowListing() {
  const [listing, setListing] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // console.log(id);

  const getListing = async () => {
    try {
      const response = await axios.get(`${config.backendUrl}/listings/${id}`);
      if (response.data) {
        setListing(response.data.listing);
        setReviews(response.data.listing.reviews || []);
        // console.log(response.data);
      } else {
        setError("Listing not found");
      }
    } catch (err) {
      setError("Error fetching listings");
      console.error("Error fetching listing: ", err);
    }
  };

  useEffect(() => {
    getListing();
  }, [id]);

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!listing || Object.keys(listing).length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center mt-5">
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-2">
      <Listing listing={listing} key={listing?._id} />
      <Map listing={listing} />
      {isAuthenticated && <ReviewInput listing={listing} />}
      <Review listing={listing} reviews={reviews} />
    </div>
  );
}

export default ShowListing;
