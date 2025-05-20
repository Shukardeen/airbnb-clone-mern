import React from "react";
import { facebook, instagram, twitter } from "../assets/index";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-200 py-3 mt-auto font-jakarta">
      <div className="socials flex justify-center items-center gap-3 py-0.5">
        <img src={facebook} alt="facebook icon" className="h-4" />
        <img src={instagram} alt="instagram icon" className="h-4" />
        <img src={twitter} alt="twitter icon" className="h-4" />
      </div>
      <div className="flex justify-center items-center py-0.5">
        <p className="font-bold">&copy; Wanderlust Private Limited</p>
      </div>
      <div className="links flex justify-center items-center gap-3 py-0.5">
        <Link className="hover:underline">Privacy Policy</Link>
        <span>&#124;</span>
        <Link className="hover:underline">Terms &amp; Conditions</Link>
      </div>
    </footer>
  );
}

export default Footer;
