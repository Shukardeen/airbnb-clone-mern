import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ListingCard({ listing }) {
  const navigate = useNavigate();

  return (
    <div
      className="h-[20.2rem] w-82 md:w-72 cursor-pointer hover:opacity-85"
      onClick={() => navigate(`/listings/${listing._id}`)}
    >
      <img
        src={listing?.image?.cloudinaryImageUrl}
        alt="listing image"
        className="w-96 h-64 object-cover rounded-3xl"
      />
      <div className="w-full pt-2 pl-1">
        <h3 className="font-bold">{listing.location}, {listing.country}</h3>
        <p>&#8377;{listing.price.toLocaleString("en-IN")} night</p>
      </div>
    </div>
  );
}

export default ListingCard;
