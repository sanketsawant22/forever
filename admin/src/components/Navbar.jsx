import React from "react";
import { assets } from "../assets/assets.js";

const Navbar = ({settoken}) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img style={{ width: "max(10%, 80px)" }} src={assets.logo} alt="" />
      <button onClick={() => {
        settoken("")
      }} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
