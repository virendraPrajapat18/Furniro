
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct, fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import UpdateProductModal from "./UpdateProductModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductTile = ({ product }) => {
  const { title, image, price, salePrice, description } = product;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showUpdate, setShowUpdate] = useState(false);

  const discountPercentage =
    salePrice && salePrice < price
      ? Math.round(((price - salePrice) / price) * 100)
      : null;

  const displayPrice = salePrice || price;

  // ✅ Delete product
  const handleDelete = async (e) => {
    e.stopPropagation(); // prevent card click
    if (window.confirm("Delete this product?")) {
      await dispatch(deleteProduct(product._id)).unwrap();
      await dispatch(fetchProducts());
      toast.success(`${product.title} deleted successfully 🗑️`);
    }
  };

  // ✅ Navigate to product detail page
  const handleCardClick = (e) => {
    // don’t navigate if button or modal is clicked
    if (e.target.closest("button")) return;
    navigate(`/product/${product._id}`);
  };

  // ✅ Add to cart
  const handleAddToCart = async (e) => {
    e.stopPropagation(); // prevent navigation when clicking button
    await dispatch(addToCart(product._id));
    toast.success(`${product.title} added to cart 🛒`);
  };

  return (
    <>
      <div
        className="relative group bg-white rounded-xl shadow-md overflow-hidden w-[285px] h-[446px] cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Product Image + Discount Badge */}
        <div className="w-full h-[301px]">
          <img className="w-full h-full object-cover" src={image} alt={title} />
          {discountPercentage && (
            <div className="absolute top-6 right-6 w-12 h-12 bg-red-500 rounded-full text-white text-sm font-bold flex items-center justify-center">
              -{discountPercentage}%
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 mb-2">{description}</p>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-gray-800">
              Rp {displayPrice.toLocaleString("id-ID")}
            </span>
            {salePrice && salePrice < price && (
              <span className="text-gray-400 text-sm line-through">
                Rp {price.toLocaleString("id-ID")}
              </span>
            )}
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* ✅ Add to cart */}
          <button
            onClick={handleAddToCart}
            className="bg-white text-[#B8860B] font-semibold py-3 px-8 rounded-md mb-4 hover:bg-gray-100 transition-colors duration-200"
          >
            Add to cart
          </button>

          {/* Update / Delete */}
          <div className="flex space-x-6">
            <button
              onClick={(e) => {
                e.stopPropagation(); // 🔥 prevent navigation
                setShowUpdate(true);
              }}
              className="flex items-center gap-2 text-white font-semibold py-2 px-5 rounded-lg hover:bg-yellow-600 transition"
            >
              <FaEdit />
              <span>Update</span>
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-600 transition"
            >
              <FaTrash />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {showUpdate && (
        <UpdateProductModal
          isOpen={showUpdate}
          onClose={() => setShowUpdate(false)}
          product={product}
        />
      )}
    </>
  );
};

export default ProductTile;
