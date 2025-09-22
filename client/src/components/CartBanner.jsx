import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

 
 const CartBanner = () => {
   return (
      <div className="relative w-full h-80 mt-[80px] overflow-hidden">
           {/* Background Image */}
           <img
             src="/shop/shop.jpg"
             alt="Shop Banner"
             className="w-full h-full object-cover opacity-50"
           />
     
           {/* Transparent Overlay for text */}
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent ">
             <h1 className="text-5xl font-bold text-gray-800 mb-2">Cart</h1>
             <div className="flex items-center text-gray-800">
               <Link to={"/"} className="text-xl">Home</Link>
               <ChevronRight className="w-5 h-5 mx-2" />
               <span className="text-xl font-semibold">Cart</span>
             </div>
           </div>
         </div>
   )
 }
 
 export default CartBanner
 