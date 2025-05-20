import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { logo } from "../assets/index";
import axios from "axios";
import { config } from "../config/config.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logoutSuccess } from '../redux/authSlice.js';
import {AuthModals} from './index.js';
import { IoSearch } from "react-icons/io5";
import { resetHomeFilters } from "../pages/Home";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${config.backendUrl}/auth/logout`, {withCredentials: true});
      toast.success("Logged out successfully");
      handleMenuClick();
      navigate("/");
      dispatch(logoutSuccess());
    } catch (error) {
      console.log("Logout error :: ", error);
    }
  }

  const handleMenuClick = () => {
    const menuBar = document.querySelector(".menuBar");
    menuBar.classList.toggle("flex");
    menuBar.classList.toggle("hidden");
  }

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${config.backendUrl}/auth/status`, {withCredentials: true});
      if (response.data.authenticated) {
        dispatch(loginSuccess(response.data.user));
      }
    } catch (error) {
      console.log("Auth check failed");
    }
  }

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Dispatch search event with the current query
    const searchEvent = new CustomEvent('searchListings', { 
      detail: { location: query.trim() }
    });
    window.dispatchEvent(searchEvent);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Reset modal state when it closes
  const handleCloseModal = () => {
    setIsAuthModalOpen(false);
    setAuthMode('login'); // Reset to default mode
  };

  return (
    <div className="w-full flex flex-col sticky top-0 z-10">
      <nav className="h-full bg-white shadow-[0_0_1px_rgb(0,0,0)] box-border z-10 px-1 md:px-6 flex justify-between items-center py-3 md:py-5">
        <div className="logo md:mr-3 ml-5 md:ml-3">
          <Link to="/">
            <img src={logo} alt="compass" className="w-28 md:m-0"  />
          </Link>
        </div>

        <div id="searchBar" className="h-12 w-80 hidden md:flex justify-center items-center md:ml-20 relative">
          <input 
            type="text"  
            placeholder="Search by location" 
            className="w-full h-full shadow-[0_0_3px_rgba(0,0,0,0.3)] rounded-full px-4 text-md font-jakarta hover:shadow-[0_0_3px_rgba(0,0,0,0.5)] focus:outline-none focus:shadow-[0_0_5px_rgba(0,0,0,0.5)]"
            value={searchQuery}
            onChange={handleSearch}
          />
          <span className="absolute bg-[#FF4A5F] text-2xl text-white p-2 rounded-full left-[17.2rem] cursor-pointer hover:bg-[#ff385c]">
            <IoSearch /> 
          </span>
        </div>

        <div className="ham-menu flex px-1 items-center justify-end gap-2">
          {isAuthenticated ? (
            <>
              {/* <span>Welcome, {user?.username}</span> */}
              <NavLink
                to={isAuthenticated ? "/new" : "#"}
                onClick={(e) => !isAuthenticated && (e.preventDefault(), openAuthModal('login'))}
                className="hidden md:block text-black hover:bg-gray-100 font-jakarta box-border px-3 py-2 rounded-full"
              >
                Airbnb your home
              </NavLink>
              <button onClick={handleLogout} className="hidden md:block h-9 px-3 rounded-sm shadow-[0_0_2px_rgba(33,58,124,0.5)] hover:bg-[#FF4A5F] hover:text-white transition-all duration-200 cursor-pointer">Logout</button>
            </>
          ) : (
            <>
              <NavLink
                to={isAuthenticated ? "/new" : "#"}
                onClick={(e) => !isAuthenticated && (e.preventDefault(), openAuthModal('login'))}
                className="hidden md:block hover:bg-gray-100 font-jakarta box-border px-3 py-2 rounded-full"
              >
                Airbnb your home
              </NavLink>
              <button onClick={() => openAuthModal('login')} className="hidden md:block h-9 px-3 rounded-sm shadow hover:shadow-lg transition-all duration-200 cursor-pointer">Login</button>
              <button onClick={() => openAuthModal('signup')} className="hidden md:block h-9 px-3 rounded-md shadow hover:shadow-lg transition-all duration-300 cursor-pointer">Signup</button>
            </>
          )}

          <button className="hamIcon w-10 h-10 flex justify-center items-center mr-2 text-2xl rounded-md md:hidden cursor-pointer" onClick={handleMenuClick}>
            &#9776;
          </button>
        </div>
      </nav>

      <div className="menuBar hidden md:hidden border-1 h-full w-full bg-gray-900 text-white flex-col items-end gap-3 pr-10 py-4">
        <NavLink
          to="/"
          className="text-white"
          onClick={handleMenuClick}
        >
          Home
        </NavLink>

        <NavLink
          to={isAuthenticated ? "/new" : "#"}
          onClick={(e) => {
            handleMenuClick();
            if (!isAuthenticated) {
              e.preventDefault();
              openAuthModal('login');
            }
          }}
          className="text-white"
        >
          Add listings
        </NavLink>

        {isAuthenticated ? (
          <>
            <button onClick={handleLogout} className="text-red-500 rounded-sm hover:bg-transparent hover:text-black hover:shadow-[0_0_10px_rgba(33,58,124,0.5)] transition-all duration-300 cursor-pointer">Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => { handleMenuClick(); openAuthModal('login'); }} className="text-blue-500 cursor-pointer">Login</button>
            <button onClick={() => { handleMenuClick(); openAuthModal('signup'); }} className="text-blue-500 cursor-pointer">Signup</button>
          </>
        )}
      </div>

      <AuthModals
        isOpen={isAuthModalOpen}
        onClose={handleCloseModal}
        initialMode={authMode}
      />
    </div>
  );
}

export default Header;
