
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { fetchCart, deleteCartItem } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
// import toast from "react-hot-toast"; // ✅ for notifications

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);

  // Fetch cart when sidebar opens
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchCart());
    }
  }, [isOpen, dispatch]);

  // Subtotal
  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product?.salePrice ?? item.product?.price ?? 0;
    const qty = item.quantity ?? 0;
    return acc + price * qty;
  }, 0);

  // Delete item from cart
  const handleDelete = async (cartItemId) => {
    try {
      
      await dispatch(deleteCartItem(cartItemId)).unwrap(); // call API & update redux
      // toast.success("Item removed from cart"); // ✅ show toast
      dispatch(fetchCart());
    } catch (err) {
      // toast.error("Failed to remove item");
      console.error(err);
    }
  };




  return (
    <div
      className={`fixed top-0 right-0 w-[417px] h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold">Shopping Cart</h2>
        <button onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-200px)]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          cartItems.map((item) => {
            const product = item.product ?? {};
            const price = product.salePrice ?? product.price ?? 0;
            const qty = item.quantity ?? 0;

            return (
              <div
                key={item._id} // cart item id
                className="flex items-center justify-between space-x-4"
              >
                <img
                  src={product.image ?? ""}
                  alt={product.title ?? "Product"}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium">
                    {product.title ?? "Unnamed"}
                  </h3>
                  <p className="text-xs text-gray-500">x{qty}</p>
                  <p className="text-sm font-semibold text-yellow-600">
                    Rs. {price.toLocaleString("en-IN")}
                  </p>
                </div>
                <button onClick={() => handleDelete(item._id)}>
                  <X size={18} className="text-gray-500 hover:text-red-500" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t space-y-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Subtotal</span>
          <span className="text-[#B88E2F]">
            Rs. {subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between gap-2">
          <Link
            to="/cart"
            className="flex flex-1 items-center justify-center border border-black rounded-full py-2 text-sm font-medium hover:bg-gray-100"
          >
            Cart
          </Link>

          <Link
            to={"/checkout"}
            className="flex flex-1 items-center justify-center border border-black rounded-full py-2 text-sm font-medium hover:bg-gray-100"
          >
            Checkout
          </Link>

          <button className="flex items-center justify-center border border-black rounded-full py-2 px-4 text-sm font-medium hover:bg-gray-100">
            Comparison
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;



