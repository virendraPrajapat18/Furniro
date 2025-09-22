const Cart = require("../models/Cart");
const Product = require("../models/Product");

// 1️⃣ Add to Cart
exports.addToCart = async (req, res) => {
  const { productId } = req.body;


  try {
    let cart = await Cart.findOne(); // get the single cart

    if (!cart) {
      // create cart if it doesn't exist
      cart = new Cart({
        products: [{ product: productId, quantity: 1 }],
      });
    } else {
      // check if product already in cart
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );

      if (productIndex > -1) {
        // product exists → increase quantity
        cart.products[productIndex].quantity += 1;
      } else {
        // product not in cart → add new
        cart.products.push({ product: productId, quantity: 1 });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// 2️⃣ Get Cart Items
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate("products.product"); // populate product details
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// 3️⃣ Update Quantity
exports.updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Product not in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};




exports.deleteCartItem = async (req, res) => {
  const { cartItemId } = req.body; // cart item ID from frontend

  try {
    const cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Keep only items whose _id is NOT the one we want to delete
   cart.products = cart.products.filter((p) => p._id.toString() !== cartItemId);
   
    await cart.save();
    res.status(200).json(cart); // returns updated cart
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};


