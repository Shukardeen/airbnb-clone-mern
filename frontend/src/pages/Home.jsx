import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListingCard, Filter } from "../components/index.js";
import { config } from "../config/config.js";
import { useLoaderData } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Home() {
  const initialData = useLoaderData().listings;
  const [data, setData] = useState(initialData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [modalFilters, setModalFilters] = useState({});
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  const handleFilter = (category) => {
    if (selectedCategory === category) {
      // If clicking the same category again, show all listings
      setData(initialData);
      setSelectedCategory(null);
    } else {
      // Filter listings based on the selected category
      const filteredListings = initialData.filter((listing) => listing.category === category);
      setData(filteredListings);
      setSelectedCategory(category);
    }
  };

  const resetFilters = () => {
    setData(initialData);
    setSelectedCategory(null);
    setSearchResults(null);
    setModalFilters({});
    setHasActiveFilters(false);
  };

  const applyModalFilters = (filters) => {
    setModalFilters(filters);

    // Filter listings that match ALL conditions
    const filteredListings = initialData.filter((listing) => {
      // Check if listing matches ANY of the place types (if place types are selected)
      const matchesPlaceType = filters.placeTypes.length === 0 ||
        filters.placeTypes.some(type => listing.typeOfPlace.includes(type));

      // Check if listing has ALL selected essentials
      const hasAllEssentials = filters.essentials.length === 0 ||
        filters.essentials.every(essential => listing.essentials.includes(essential));

      // Check if price is within range
      const isWithinPriceRange = listing.price >= filters.minPrice &&
        listing.price <= filters.maxPrice;

      // Return true only if ALL conditions are met
      return matchesPlaceType && hasAllEssentials && isWithinPriceRange;
    });

    const hasFilters = filters.placeTypes.length > 0 ||
      filters.essentials.length > 0 ||
      filters.minPrice > 0 ||
      filters.maxPrice < Infinity;

    setHasActiveFilters(hasFilters);
    setModalFilters(filters);
    setSelectedCategory(null); // clear category filters
    setData(filteredListings);
  };

  useEffect(() => {
    const handleResetFilters = () => {
      resetFilters();
    };

    const handleSearch = (event) => {
      const { location } = event.detail;
      if (!location) {
        // If search is empty, show all listings
        setData(initialData);
        setSearchResults(null);
        return;
      }

      const searchResults = initialData.filter(listing =>
        listing.location.toLowerCase().includes(location.toLowerCase())
      );
      setSearchResults(searchResults);
      setData(searchResults);
      setSelectedCategory(null);
    };

    // Add event listeners
    window.addEventListener('resetFilters', handleResetFilters);
    window.addEventListener('searchListings', handleSearch);

    // Cleanup
    return () => {
      window.removeEventListener('resetFilters', handleResetFilters);
      window.removeEventListener('searchListings', handleSearch);
    };
  }, [initialData]);

  return (
    <div className="w-full min-h-full p-6 font-jakarta" data-component="home">
      <Filter
        handleFilter={handleFilter}
        selectedCategory={selectedCategory}
        applyModalFilters={applyModalFilters}
        resetFilters={resetFilters}
      />

      {hasActiveFilters && (
        <div className="flex justify-start items-center gap-1 my-2 ml-2">
          <div className="text-md text-gray-500">
            Showing filtered results
          </div>
          <button
            onClick={resetFilters}
            className="px-1 text-sm text-red-500 bg-red-100 border-1 border-red-500 rounded-sm hover:bg-red-200 transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}

      
        {data.length > 0 ? (
          <div className="w-full listings grid grid-cols-1 flex-wrap md:grid-cols-4 place-items-center gap-1.5 mt-5">
          {data.map((listing) => (
            <ListingCard listing={listing} key={listing._id} />
          ))}
          </div>
        ) : (
          <div className='w-full min-h-full flex flex-col justify-center items-center'>
            <DotLottieReact
              src="https://lottie.host/78aaec9c-5d64-4b93-8419-f2024fb747b0/8jwn2Qszgx.lottie"
              loop
              autoplay
              className="w-2/5"
            />
            <h1 className='text-xl font-bold font-jakarta'>No listings found!</h1>
          </div>
        )}
    </div>
  );
}

// Export the resetFilters function to be used by the Header
export const resetHomeFilters = () => {
  const homeComponent = document.querySelector('[data-component="home"]');
  if (homeComponent) {
    const event = new CustomEvent('resetFilters');
    homeComponent.dispatchEvent(event);
  }
};

async function getListings() {
  const response = await axios.get(`${config.backendUrl}/listings`, { withCredentials: true });
  return response.data;
}

export { Home, getListings };
