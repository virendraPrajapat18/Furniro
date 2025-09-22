

import React from "react";
import ProductTile from "./ProductTile";
import { Link } from "react-router-dom";

const RelatedProducts = () => {
  // Static product list
 const related = [
   {
     _id: "1",
     name: "Asgaard Sofa",
     title: "Luxury Leather Sofa",
     image: "/Furniture/img4.png",
     price: 300,
     salePrice: 250,
     description: "A luxurious leather sofa with classic Scandinavian design.",
   },
   {
     _id: "2",
     name: "Nordic Chair",
     title: "Ergonomic Nordic Chair",
     image: "/Furniture/img5.png",
     price: 150,
     salePrice: 120,
     description:
       "Comfortable and stylish chair designed for long hours of sitting.",
   },
   {
     _id: "3",
     name: "Minimal Table",
     title: "Modern Minimalist Table",
     image: "/Furniture/img7.png",
     price: 220,
     salePrice: 180,
     description:
       "Sleek wooden table with a minimalist look perfect for any home.",
   },
   {
     _id: "4",
     name: "Classic Lamp",
     title: "Antique Style Lamp",
     image: "/Furniture/img9.png",
     price: 100,
     salePrice: 75,
     description: "Vintage-inspired lamp with warm lighting and elegant base.",
   },
 ];


  return (
    <div className="flex flex-col justify-center items-center gap-12 py-16 px-4">
      <h1 className="text-[36px] font-[500]">Related Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {related.map((product) => (
          <ProductTile key={product._id} product={product} />
        ))}
      </div>

      <Link to={"/shop"} className="border border-[#B88E2F] text-[#B88E2F] px-8 py-2 mt-6 rounded-md font-medium text-lg hover:bg-[#B88E2F] hover:text-white transition-colors duration-300">
        Show More
      </Link>
    </div>
  );
};

export default RelatedProducts;
