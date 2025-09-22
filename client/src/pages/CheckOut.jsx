import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  clearCart,
  clearCartFromDB,
} from "../redux/slices/cartSlice"; // Ensure clearCart is defined in slice
import Warranty from "../components/Warranty";


const CheckOut = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "Sri Lanka",
    streetAddress: "",
    town: "",
    province: "Western Province",
    zipCode: "",
    phone: "",
    email: "",
    additionalInfo: "",
  });

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const total = items.reduce((sum, item) => {
    const price = item?.product?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handlePlaceOrder = () => {
    // Optional: validate formData here

    // Clear form
    setFormData({
      firstName: "",
      lastName: "",
      companyName: "",
      country: "Sri Lanka",
      streetAddress: "",
      town: "",
      province: "Western Province",
      zipCode: "",
      phone: "",
      email: "",
      additionalInfo: "",
    });

    // Clear cart
    dispatch(clearCartFromDB()); 
    dispatch(clearCart());
    // dispatch(fetchCart());
  };

 

  return (
    <>
      <div className="relative w-full h-80 mt-[80px] overflow-hidden">
        <img
          src="/shop/shop.jpg"
          alt="Shop Banner"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">Checkout</h1>
          <div className="flex items-center text-gray-800">
            <Link to={"/"} className="text-xl">
              Home
            </Link>
            <ChevronRight className="w-5 h-5 mx-2" />
            <span className="text-xl font-semibold">Checkout</span>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-white p-4 sm:p-8 flex items-start justify-center font-sans">
        <div className="container mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Billing Form */}
          <div className="flex-1 w-full lg:w-auto p-4 md:p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">
              Billing details
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {[
                { id: "firstName", label: "First Name" },
                { id: "lastName", label: "Last Name" },
              ].map(({ id, label }) => (
                <div key={id} className="flex flex-col">
                  <label
                    htmlFor={id}
                    className="text-gray-600 font-medium mb-2"
                  >
                    {label}
                  </label>
                  <input
                    type="text"
                    id={id}
                    value={formData[id]}
                    onChange={handleChange}
                    className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
                  />
                </div>
              ))}
              <div className="flex flex-col md:col-span-2">
                <label
                  htmlFor="companyName"
                  className="text-gray-600 font-medium mb-2"
                >
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
                />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label
                  htmlFor="country"
                  className="text-gray-600 font-medium mb-2"
                >
                  Country / Region
                </label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
                >
                  <option>Sri Lanka</option>
                  <option>India</option>
                  <option>United States</option>
                </select>
              </div>
              {[
                { id: "streetAddress", label: "Street address" },
                { id: "town", label: "Town / City" },
              ].map(({ id, label }) => (
                <div key={id} className="flex flex-col md:col-span-2">
                  <label
                    htmlFor={id}
                    className="text-gray-600 font-medium mb-2"
                  >
                    {label}
                  </label>
                  <input
                    type="text"
                    id={id}
                    value={formData[id]}
                    onChange={handleChange}
                    className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
                  />
                </div>
              ))}
              <div className="flex flex-col md:col-span-2">
                <label
                  htmlFor="province"
                  className="text-gray-600 font-medium mb-2"
                >
                  Province
                </label>
                <select
                  id="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
                >
                  <option>Western Province</option>
                  <option>Central Province</option>
                  <option>Northern Province</option>
                </select>
              </div>
              {[
                { id: "zipCode", label: "ZIP code" },
                { id: "phone", label: "Phone" },
                { id: "email", label: "Email address", type: "email" },
                { id: "additionalInfo", label: "Additional Information" },
              ].map(({ id, label, type = "text" }) => (
                <div key={id} className="flex flex-col md:col-span-2">
                  <label
                    htmlFor={id}
                    className="text-gray-600 font-medium mb-2"
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    id={id}
                    value={formData[id]}
                    onChange={handleChange}
                    className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
                  />
                </div>
              ))}
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 p-6 md:p-8 bg-[#F9F1E7] rounded-2xl shadow-xl">
            <div className="flex justify-between items-center text-lg mb-6">
              <h3 className="font-semibold">Product</h3>
              <h3 className="font-semibold">Subtotal</h3>
            </div>

            {status === "loading" ? (
              <p>Loading cart...</p>
            ) : items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center mb-4"
                >
                  <span className="text-gray-600 font-medium">
                    {item?.product?.title || "N/A"} x {item.quantity}
                  </span>
                  <span className="text-gray-800 font-medium">
                    Rs.{" "}
                    {(item?.product?.price * item.quantity).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>
              ))
            )}

            <div className="flex justify-between items-center py-4 border-t border-gray-300">
              <span className="text-lg font-bold">Subtotal</span>
              <span className="text-lg font-semibold text-gray-800">
                Rs. {total.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-gray-300 mb-6">
              <span className="text-lg font-bold">Total</span>
              <span className="text-xl font-bold text-[#B88E2F]">
                Rs. {total.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Payment Options */}
            <div className="space-y-4 mb-8">
              <label className="flex items-center space-x-2 text-sm text-gray-800">
                <input type="radio" name="paymentMethod" defaultChecked />
                <span>Direct Bank Transfer</span>
              </label>
              <p className="text-xs text-gray-600 pl-6">
                Make your payment directly into our bank account. Use your Order
                ID as the reference.
              </p>
              <label className="flex items-center space-x-2 text-sm text-gray-800">
                <input type="radio" name="paymentMethod" />
                <span>Cash On Delivery</span>
              </label>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Your personal data will be used to support your experience
              throughout this website and for other purposes described in our{" "}
              <a href="#" className="text-[#B88E2F] font-semibold">
                privacy policy
              </a>
              .
            </p>

            {/* ✅ Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 text-lg text-[#B88E2F] border-2 border-[#B88E2F] rounded-2xl hover:bg-[#B88E2F] hover:text-white transition-colors duration-300 font-medium"
            >
              Place order
            </button>
          </div>
        </div>
      </div>

      <Warranty />
    </>
  );
};

export default CheckOut;







































// import React, { useEffect } from "react";
// import { ChevronRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCart } from "../redux/slices/cartSlice";
// import Warranty from "../components/Warranty";

// const CheckOut = () => {
//   const dispatch = useDispatch();
//   const { items, status } = useSelector((state) => state.cart);

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   const total = items.reduce((sum, item) => {
//     const price = item?.product?.price || 0;
//     return sum + price * item.quantity;
//   }, 0);

//   return (
//     <>
//       <div className="relative w-full h-80 mt-[80px] overflow-hidden">
//         <img
//           src="/shop/shop.jpg"
//           alt="Shop Banner"
//           className="w-full h-full object-cover opacity-50"
//         />
//         <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent">
//           <h1 className="text-5xl font-bold text-gray-800 mb-2">Checkout</h1>
//           <div className="flex items-center text-gray-800">
//             <Link to={"/"} className="text-xl">
//               Home
//             </Link>
//             <ChevronRight className="w-5 h-5 mx-2" />
//             <span className="text-xl font-semibold">Checkout</span>
//           </div>
//         </div>
//       </div>

//       <div className="min-h-screen bg-white p-4 sm:p-8 flex items-start justify-center font-sans">
//         <div className="container mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
//           {/* Billing Details */}
//           <div className="flex-1 w-full lg:w-auto p-4 md:p-8 bg-white rounded-2xl shadow-lg">
//             <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">
//               Billing details
//             </h2>
//               <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//               <div className="flex flex-col">
//                 <label
//                   htmlFor="firstName"
//                   className="text-gray-600 font-medium mb-2"
//                 >
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label
//                   htmlFor="lastName"
//                   className="text-gray-600 font-medium mb-2"
//                 >
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
//                 />
//               </div>
//               <div className="flex flex-col md:col-span-2">
//                 <label
//                   htmlFor="companyName"
//                   className="text-gray-600 font-medium mb-2"
//                 >
//                   Company Name (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   id="companyName"
//                   className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
//                 />
//               </div>
//               <div className="flex flex-col md:col-span-2">
//                 <label
//                   htmlFor="country"
//                   className="text-gray-600 font-medium mb-2"
//                 >
//                   Country / Region
//                 </label>
//                 <select
//                   id="country"
//                   className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
//                 >
//                   <option>Sri Lanka</option>
//                   <option>India</option>
//                   <option>United States</option>
//                 </select>
//               </div>
//               <div className="flex flex-col md:col-span-2">
//                 <label
//                   htmlFor="streetAddress"
//                   className="text-gray-600 font-medium mb-2"
//                 >
//                   Street address
//                 </label>
//                 <input
//                   type="text"
//                   id="streetAddress"
//                   className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
//                 />
//               </div>
//               <div className="flex flex-col md:col-span-2">
//                 <label
//                   htmlFor="town"
//                   className="text-gray-600 font-medium mb-2"
//                 >
//                   Town / City
//                 </label>
//                 <input
//                   type="text"
//                   id="town"
//                   className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
//                 />
//               </div>
//               <div className="flex flex-col md:col-span-2">
//                 <label
//                   htmlFor="province"
//                   className="text-gray-600 font-medium mb-2"
//                 >
//                   Province
//                 </label>
//                 <select
//                   id="province"
//                   className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
//                 >
//                   <option>Western Province</option>
//                   <option>Central Province</option>
//                   <option>Northern Province</option>
//                 </select>
//               </div>
//               <div className="flex flex-col md:col-span-2">
//                 <label
//                   htmlFor="zipCode"
//                   className="text-gray-600 font-medium mb-2"
//                 >
//                   ZIP code
//                 </label>
//                 <input
//                   type="text"
//                   id="zipCode"
//                   className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
//                 />
//               </div>
//               <div className="flex flex-col md:col-span-2">
//                 <label
//                   htmlFor="phone"
//                   className="text-gray-600 font-medium mb-2"
//                 >
//                   Phone
//                 </label>
//                 <input
//                   type="text"
//                   id="phone"
//                   className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
//                 />
//               </div>
//               <div className="flex flex-col md:col-span-2">
//                 <label
//                   htmlFor="email"
//                   className="text-gray-600 font-medium mb-2"
//                 >
//                   Email address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
//                 />
//               </div>
//               <div className="flex flex-col md:col-span-2">
//                 <input
//                   type="text"
//                   placeholder="Additional Information"
//                   className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
//                 />
//               </div>
//             </form>
//           </div>

//           {/* Order Summary */}
//           <div className="w-full lg:w-96 p-6 md:p-8 bg-[#F9F1E7] rounded-2xl shadow-xl">
//             <div className="flex justify-between items-center text-lg mb-6">
//               <h3 className="font-semibold">Product</h3>
//               <h3 className="font-semibold">Subtotal</h3>
//             </div>

//             {/* Cart Items */}
//             {status === "loading" ? (
//               <p>Loading cart...</p>
//             ) : items.length === 0 ? (
//               <p>Your cart is empty.</p>
//             ) : (
//               items.map((item) => (
//                 <div
//                   key={item._id}
//                   className="flex justify-between items-center mb-4"
//                 >
//                   <span className="text-gray-600 font-medium">
//                     {item?.product?.title || "N/A"} x {item.quantity}
//                   </span>
//                   <span className="text-gray-800 font-medium">
//                     Rs.{" "}
//                     {(item?.product?.price * item.quantity).toLocaleString(
//                       "en-IN"
//                     )}
//                   </span>
//                 </div>
//               ))
//             )}

//             <div className="flex justify-between items-center py-4 border-t border-gray-300">
//               <span className="text-lg font-bold">Subtotal</span>
//               <span className="text-lg font-semibold text-gray-800">
//                 Rs. {total.toLocaleString("en-IN")}
//               </span>
//             </div>

//             <div className="flex justify-between items-center py-4 border-b border-gray-300 mb-6">
//               <span className="text-lg font-bold">Total</span>
//               <span className="text-xl font-bold text-[#B88E2F]">
//                 Rs. {total.toLocaleString("en-IN")}
//               </span>
//             </div>

//             {/* Payment Options */}
//             <div className="space-y-4 mb-8">
//               <label className="flex items-center space-x-2 text-sm text-gray-800">
//                 <input type="radio" name="paymentMethod" defaultChecked />
//                 <span>Direct Bank Transfer</span>
//               </label>
//               <p className="text-xs text-gray-600 pl-6">
//                 Make your payment directly into our bank account. Use your Order
//                 ID as the reference.
//               </p>
//               <label className="flex items-center space-x-2 text-sm text-gray-800">
//                 <input type="radio" name="paymentMethod" />
//                 <span>Cash On Delivery</span>
//               </label>
//             </div>

//             <p className="text-sm text-gray-600 mb-6">
//               Your personal data will be used to support your experience
//               throughout this website and for other purposes described in our{" "}
//               <a href="#" className="text-[#B88E2F] font-semibold">
//                 privacy policy
//               </a>
//               .
//             </p>

//             <button className="w-full py-3 text-lg text-[#B88E2F] border-2 border-[#B88E2F] rounded-2xl hover:bg-[#B88E2F] hover:text-white transition">
//               Place order
//             </button>
//           </div>
//         </div>
//       </div>
//       <Warranty/>
//     </>
//   );
// };

// export default CheckOut;
