import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setlist] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      console.log(response.data);

      if (response.data.success) {
        setlist(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch list");
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to remove product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="px-2 hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 border border-gray-200 bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {list.map((items, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 px-2 bg-gray-100 text-sm"
            key={index}
          >
            <img className="w-12" src={items.image[0]} alt="" />
            <p>{items.name}</p>
            <p>{items.category}</p>
            <p>
              {currency}
              {items.price}
            </p>
            <p onClick={() => {
              removeProduct(items._id);
            }} className="text-right md:text-center cursor-pointer text-lg font-semibold">
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
