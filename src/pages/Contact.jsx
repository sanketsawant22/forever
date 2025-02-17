import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import Newsletter from "../components/Newsletter";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-20">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px]"
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            Shop-23, Benchmark Complex <br /> Gangapur Road, Nashik,
            Maharashtra.
          </p>
          <p className="text-gray-500">
            Tel: 111-222-333 <br /> Email: Forever@gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Carrers at Forever
          </p>
          <p className="text-gray-500">
            Learn more about our team and job oppenings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Job</button>
        </div>
      </div>

      <Newsletter />
    </div>
  );
};

export default Contact;
