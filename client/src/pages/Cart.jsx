import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../redux/slices/cartSlice";
import CartBanner from "../components/CartBanner";
import Warranty from "../components/Warranty";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const total = items.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <>
      <CartBanner />

      <div className=" bg-white p-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-stretch">
          {/* Product List */}
          <div className="w-full lg:w-3/4 bg-[#fcf6ef] rounded-md p-6">
            <div className="grid grid-cols-5 font-semibold text-gray-800 border-b pb-4">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
              <div></div> {/* Keep empty column for layout consistency */}
            </div>

            {status === "loading" ? (
              <div className="p-4 text-gray-500">Loading cart...</div>
            ) : status === "failed" ? (
              <div className="p-4 text-red-500">Error: {error}</div>
            ) : items.length === 0 ? (
              <div className="p-4 text-gray-600">Your cart is empty.</div>
            ) : (
              items.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-5 items-center gap-4 py-6 border-b"
                >
                  {/* Product */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        item.product?.image && item.product.image.trim() !== ""
                          ? item.product.image
                          : "https://via.placeholder.com/80"
                      }
                      alt={item.product?.title || "Product"}
                      className="w-20 h-20 object-cover rounded-md bg-[#f5eee4]"
                    />
                    <span className="text-gray-500">
                      {item.product?.title || "N/A"}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="text-gray-500">
                    Rs. {item.product?.price?.toLocaleString() || "0"}
                  </div>

                  {/* Quantity */}
                  <div>
                    <input
                      type="number"
                      value={item.quantity}
                      readOnly
                      className="w-12 border border-gray-300 rounded text-center"
                    />
                  </div>

                  {/* Subtotal */}
                  <div className="text-gray-700 font-medium">
                    Rs.{" "}
                    {(item.product?.price * item.quantity)?.toLocaleString() ||
                      "0"}
                  </div>

                  {/* Empty div to maintain grid layout */}
                  <div></div>
                </div>
              ))
            )}
          </div>

          {/* Cart Totals */}
          <div className="w-full lg:w-1/4 bg-[#fcf6ef] p-6 rounded-md shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-black">
                Cart Totals
              </h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-medium">Subtotal</span>
                <span className="text-gray-400">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-gray-900 font-semibold">Total</span>
                <span className="text-yellow-600 font-bold">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
            </div>
            <Link to={"/checkout"} className="w-full py-3 mt-4 rounded-md border border-black hover:bg-black hover:text-white transition">
              Check Out
            </Link>
          </div>
        </div>
      </div>
      <Warranty/>
    </>
  );
};

export default Cart;
