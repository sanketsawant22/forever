import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="container mx-auto px-5">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="Shopsi Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero ad
            quae repudiandae rem optio, sint, explicabo commodi sunt dicta
            doloribus magni consequatur recusandae facilis non laboriosam ea
            culpa eius officiis?
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>support@shopsi.com</li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-300" />
      <p className="py-5 text-sm text-center">
        © 2024 forever.com - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
