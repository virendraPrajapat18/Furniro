
// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://furniro-p8i6.onrender.com/api/products";

// ✅ Fetch all products with pagination
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async ({ page = 1, limit = 16 } = {}) => {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data;
  }
);

// ✅ Fetch single product by ID
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Add product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData) => {
    const res = await axios.post(API_URL, productData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
);

// ✅ Fetch filtered products (can also add pagination later)
export const fetchFilteredProducts = createAsyncThunk(
  "products/fetchFiltered",
  async ({ categories, brands, minPrice, maxPrice, sortBy }) => {
    const params = new URLSearchParams();

    if (categories?.length) params.append("category", categories.join(","));
    if (brands?.length) params.append("brand", brands.join(","));
    if (minPrice !== undefined) params.append("minPrice", minPrice);
    if (maxPrice !== undefined) params.append("maxPrice", maxPrice);
    if (sortBy) params.append("sortBy", sortBy);

    const response = await axios.get(`${API_URL}/filterproducts?${params.toString()}`);
    return response.data;
  }
);

// ✅ Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    singleProduct: null,
    status: "idle",
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  },
  reducers: {
    clearSingleProduct: (state) => {
      state.singleProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch All
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.data;
        state.totalProducts = action.payload.totalProducts;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // 🔹 Fetch Single Product
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleProduct = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // 🔹 Add Product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
      })

      // 🔹 Fetch Filtered
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.data;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // 🔹 Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updated = action.payload.data;
        const index = state.items.findIndex((p) => p._id === updated._id);
        if (index !== -1) state.items[index] = updated;
      })

      // 🔹 Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.payload);
      });
  },
});

export const { clearSingleProduct } = productSlice.actions;
export default productSlice.reducer;
