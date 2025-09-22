const express = require("express");
const router = express.Router();
const {
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
  getProductById,
  getFilteredProducts,
} = require("../controllers/productController");
const upload = require("../middleware/uploadMiddleware.js");


router.post("/", upload.single("image"), addProduct);

router.get("/filterproducts", getFilteredProducts);

router.get("/", fetchAllProducts);

router.get("/:id", getProductById);

router.put("/:id", upload.single("image"), editProduct);

router.delete("/:id", deleteProduct);



module.exports = router;
