import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/relatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");

  const [size, setsize] = useState("");

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* IMAGES */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((img, index) => (
              <img
                onClick={() => setImage(img)}
                src={img}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={`Product-${index}`}
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="Selected Product" />
          </div>
        </div>

        {/* PRDUCT DETAILS */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1  mt-2">
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_dull_icon} alt="" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((items, index) => (
                <button
                  onClick={() => {
                    setsize(items);
                  }}
                  className={`cursor-pointer py-2 px-4 bg-gray-100 ${
                    items === size ? "border border-orange-500" : "border-none"
                  }`}
                  key={index}
                >
                  {items}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => {
            addToCart(productData._id,size)
          }} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Origional product.</p>
            <p>Cash on dellivery available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* DESCRIPTION AND REVIEW SECTION */}
      <div className="mt-20">
        <div className="flex">
          <p className="border border-gray-300 px-5 text-sm py-3">
            Description
          </p>
          <p className="border border-gray-300 px-5 text-sm py-3">
            Reveiws(122)
          </p>
        </div>
        <div className="flex border-gray-200 flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
            at tempore minus quaerat earum quisquam cumque odio enim possimus ad
            natus in similique harum, amet iure ex voluptatum fugit a.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Necessitatibus saepe nemo enim et cum eligendi at! Nam quisquam
            accusamus consectetur!
          </p>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;