import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "../components/Title.jsx";
import ProductItem from "./ProductItem.jsx";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setlatestProduct] = useState([]);

  useEffect(() => {
    setlatestProduct(products.slice(0, 10));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our latest fashion trends—premium quality, stylish designs,
          and unbeatable comfort. Upgrade your wardrobe today!
        </p>
      </div>

      {/* display prducts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProduct.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
