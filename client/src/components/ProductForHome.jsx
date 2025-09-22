import React from "react";
import ProductTile from "./ProductTile";
import { Link } from "react-router-dom";

const ProductForHome = () => {
  // Static product list
  const related = [
    {
      _id: "1",
      name: "Asgaard Sofa",
      title: "Luxury Leather Sofa",
      image: "/Furniture/img1.png",
      price: 250000.0,
      salePrice: null,
      description: "A luxurious leather sofa with classic Scandinavian design.",
    },
    {
      _id: "2",
      name: "Nordic Chair",
      title: "Ergonomic Nordic Chair",
      image: "/Furniture/img2.png",
      price: 150000.0,
      salePrice: 120000.0,
      description:
        "Comfortable and stylish chair designed for long hours of sitting.",
    },
    {
      _id: "3",
      name: "Minimal Table",
      title: "Modern Minimalist Table",
      image: "/Furniture/img3.png",
      price: 220000.0,
      salePrice: null,
      description:
        "Sleek wooden table with a minimalist look perfect for any home.",
    },
    {
      _id: "4",
      name: "Classic Lamp",
      title: "Antique Style Lamp",
      image: "/Furniture/img4.png",
      price: 100000.0,
      salePrice: 75000.0,
      description: "Vintage-inspired lamp with warm lighting and elegant base.",
    },
    {
      _id: "5",
      name: "Classic Coffee Table",
      title: "Modern and Simple",
      image: "/Furniture/img5.png",
      price: 180000.0,
      salePrice: null,
      description: "A minimalist coffee table to complement your living room.",
    },
    {
      _id: "6",
      name: "Wooden Desk",
      title: "Sturdy Wooden Desk",
      image: "/Furniture/img6.png",
      price: 350000.0,
      salePrice: 290000.0,
      description: "A durable and spacious desk for your home office.",
    },
    {
      _id: "7",
      name: "Elegant Bookshelf",
      title: "Tall and Stylish",
      image: "/Furniture/img7.png",
      price: 450000.0,
      salePrice: null,
      description:
        "An elegant bookshelf perfect for displaying your book collection.",
    },
    {
      _id: "8",
      name: "Arm Chair",
      title: "Comfortable Arm Chair",
      image: "/Furniture/img8.png",
      price: 120000.0,
      salePrice: 95000.0,
      description: "A plush arm chair for reading and relaxing.",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-12 py-16 px-4">
      <h1 className="text-[36px] font-[500]">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {related.map((product) => (
          <ProductTile key={product._id} product={product} />
        ))}
      </div>

      <Link
        to={"/shop"}
        className="border border-[#B88E2F] text-[#B88E2F] px-8 py-2 mt-6 rounded-md font-medium text-lg hover:bg-[#B88E2F] hover:text-white transition-colors duration-300"
      >
        Show More
      </Link>
    </div>
  );
};

export default ProductForHome;
