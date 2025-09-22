const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/add", cartController.addToCart);
router.get("/get", cartController.getCart);
router.put("/update", cartController.updateCartItem);
router.delete("/delete", cartController.deleteCartItem);
router.delete("/delete/all", async (req, res) => {
  try {
    await Cart.deleteMany(); // This deletes all cart documents
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear cart" });
  }
});

module.exports = router;
