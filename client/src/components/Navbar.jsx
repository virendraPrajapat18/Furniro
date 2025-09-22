import { useState } from "react";
import { Menu, X, ShoppingCart, User, Search, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import CartSidebar from "./CartSidebar"; // import the sidebar

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [isCartOpen, setIsCartOpen] = useState(false); // cart sidebar

  // dummy cart items for now
  const cartItems = [
    {
      id: 1,
      name: "Asgaard sofa",
      price: 250000,
      qty: 1,
      image: "/cart/sofa.png",
    },
    {
      id: 2,
      name: "Casaliving Wood",
      price: 270000,
      qty: 1,
      image: "/cart/wood.png",
    },
  ];

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[80px] flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-yellow-600">
              <img src="/header/logo.png" alt="Logo" className="h-8 sm:h-10" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="hover:text-yellow-600 text-[16px] font-medium"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="hover:text-yellow-600 text-[16px] font-medium"
            >
              Shop
            </Link>
            <button
              
              className="hover:text-yellow-600 text-[16px] font-medium"
            >
              About
            </button>
            <Link
              to="/contact"
              className="hover:text-yellow-600 text-[16px] font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <User size={24} className="cursor-pointer hover:text-yellow-600" />
            <Search
              size={24}
              className="cursor-pointer hover:text-yellow-600"
            />
            <Heart size={24} className="cursor-pointer hover:text-yellow-600" />
            <ShoppingCart
              size={24}
              className="cursor-pointer hover:text-yellow-600"
              onClick={() => setIsCartOpen(true)} // ✅ open cart
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white px-4 py-4 space-y-4 shadow-md">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block hover:text-yellow-600"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsOpen(false)}
              className="block hover:text-yellow-600"
            >
              Shop
            </Link>
            <button
              
              onClick={() => setIsOpen(false)}
              className="block hover:text-yellow-600"
            >
              About
            </button>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block hover:text-yellow-600"
            >
              Contact
            </Link>

            {/* Mobile Icons */}
            <div className="flex space-x-6 pt-2">
              <User
                size={22}
                className="cursor-pointer hover:text-yellow-600"
              />
              <Search
                size={22}
                className="cursor-pointer hover:text-yellow-600"
              />
              <Heart
                size={22}
                className="cursor-pointer hover:text-yellow-600"
              />
              <ShoppingCart
                size={22}
                className="cursor-pointer hover:text-yellow-600"
                onClick={() => setIsCartOpen(true)} // ✅ open cart in mobile
              />
            </div>
          </div>
        )}
      </nav>

      {/* ✅ Cart Sidebar rendered outside nav so it overlays the page */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />
    </>
  );
};

export default Navbar;








































