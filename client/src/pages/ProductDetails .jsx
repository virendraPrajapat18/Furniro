

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductDescription from "../components/ProductDescription";
import RelatedProducts from "../components/RelatedProducts";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`https://furniro-p8i6.onrender.com/api/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center">Loading...</p>;

  const data = product.data;
 
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

   const handleAddToCart = async (e) => {
      e.stopPropagation(); // prevent navigation when clicking button
      await dispatch(addToCart(data._id));
      toast.success(`${data.title} added to cart 🛒`);
    };

  return (
    <>
      <div className="bg-[#f9f1e7] mt-[80px] py-4 px-12 h-[100px] flex items-center justify-between">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm">
          <Link to="/" className="text-gray-400 text-[16px] hover:underline">
            Home
          </Link>
          <span className="text-gray-400 h-[20px] w-[20px] ">›</span>
          <Link
            to="/shop"
            className="text-gray-400 text-[16px] hover:underline"
          >
            Shop
          </Link>
          <span className="text-gray-400 h-[20px] w-[20px] ">›</span>
          <div className="border-l border-gray-400 h-6 mx-4"></div>
          <span className="text-black font-[400] text-[16px]">
            {data.title}{" "}
          </span>
        </div>
      </div>

      <div className="container mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Product Images with thumbnails on the left */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col space-y-2">
            {[...Array(4)].map((_, i) => (
              <img
                key={i}
                src={data.image}
                alt={`${data.title}-${i}`}
                className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:border-yellow-600"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 h-[450px]">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Right: Product Info */}
        <div>
          {/* Title */}
          <h1 className="text-3xl font-bold">{data.title}</h1>

          {/* Price */}
          <p className="text-[24px] font-semibold text-[#9F9F9F] mt-2">
            Rs. {data.price}
          </p>

          {/* Reviews */}
          <div className="flex items-center space-x-2 mt-2">
            ⭐⭐⭐⭐ <span className="text-gray-500">(10 Reviews)</span>
          </div>

          {/* Description */}
          <p className="font-weight-400  font-[13px]mt-4">{data.description}</p>

          {/* Size */}
          <div className="mt-6">
            <p className="font-weight-400  font-[14px] text-[#9F9F9F]">Size:</p>
            <div className="flex space-x-2 mt-2">
              <button className=" w-[30px] h-[30px] bg-[#F9F1E7]  rounded-[5px]">
                L
              </button>
              <button className=" w-[30px] h-[30px] bg-[#F9F1E7]  rounded-[5px]">
                XL
              </button>
              <button className=" w-[30px] h-[30px] bg-[#F9F1E7]  rounded-[5px]">
                XS
              </button>
            </div>
          </div>

      

          {/* Color */}
          <div className="mt-6">
            <p className="font-weight-400  font-[14px] text-[#9F9F9F] ">
              Color:
            </p>
            <div className="flex space-x-2 mt-2">
              <button className="h-[30px] w-[30px] rounded-full bg-[#816DFA] "></button>

              {/* Light Blue */}
              <button className="h-[30px] w-[30px] rounded-full bg-black "></button>

              {/* Brown/Gold Shade */}
              <button className="h-[30px] w-[30px] rounded-full bg-[#B88E2F]"></button>
            </div>
          </div>

         

          <div className="flex space-x-4 mt-12">
            {/* Quantity Selector */}
            <div className="flex items-center border rounded px-2">
              <button
                onClick={handleDecrease}
                className="px-2 text-gray-600 hover:text-black"
              >
                -
              </button>
              <span className="px-2">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="px-2 text-gray-600 hover:text-black"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 border rounded hover:bg-gray-100"
            >
              Add To Cart
            </button>

            {/* Compare */}
            <button className="px-6 py-2 border rounded hover:bg-gray-100">
              + Compare
            </button>
          </div>

        
        </div>
      </div>
      <ProductDescription image={data.image} />
      <RelatedProducts />
    </>
  );
};

export default ProductDetails;
