const Product = require("../models/Product");

// Add a new Product
const addProduct = async (req, res) => {
  try {
    const {  title, description, category, price,salePrice, totalStock,brand } = req.body;
    // const imageUrl = req.file ? "/uploads/" + req.file.filename : "";
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : "";

    const newProduct = new Product({
      image: imageUrl, // static image path like "/images/product1.jpg"
      title,
      description,
      category,
      price,
      salePrice,
      totalStock,
      brand
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (e) {
    console.log("Error in product controller:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};


//get filtered products
const getFilteredProducts = async (req, res) => {
  try {
    const {
      category = "",
      brand = "",
      minPrice = 0,
      maxPrice = 8000000,
      sortBy = "default",
    } = req.query;

    let filters = {
      price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
    };

    if (category && category !== "All") {
      filters.category = { $in: category.split(",") };
    }

    if (brand) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};
    switch (sortBy) {
      case "priceLowToHigh":
        sort.price = 1;
        break;
      case "priceHighToLow":
        sort.price = -1;
        break;
      case "brand":
        sort.brand = 1;
        break;
      // case "newest":
      //   sort.createdAt = -1;
      //   break;
      default:
        sort._id = -1;
    }
    console.log("filter:",filters,"sort:",sort);
    
    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.log("Filter error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



const fetchAllProducts = async (req, res) => {
  try {
    // Get page and limit from query, default to page 1, limit 16
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 16;
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments({});
    const products = await Product.find({})
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 }); // latest products first

    res.status(200).json({
      success: true,
      data: products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    });
  } catch (e) {
    console.log("Error in product controller:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    console.log("getProductById called");
    
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
console.log("product:",product);

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log("Error in product controller:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};


// Edit a Product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {  title, description, category, price,salePrice, totalStock,brand } = req.body;
    const imageUrl = req.file ? "/uploads/" + req.file.filename : undefined; 

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.category = category || product.category;
    product.price = price !== undefined ? price : product.price;
    product.salePrice = salePrice !== undefined ? salePrice : product.salePrice;
    product.totalStock = totalStock !== undefined ? totalStock : product.totalStock;
    product.imageUrl = imageUrl || product.imageUrl;
    product.brand = brand || product.brand;

    await product.save();
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log("Error in product controller:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    console.log("Error in product controller:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

module.exports = {
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
  getProductById,
  getFilteredProducts,
};
