import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9000/api/cart";

// ✅ Fetch Cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await axios.get(`${API_URL}/get`);

  return res.data;
});

// ✅ Add Product to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId) => {
    const res = await axios.post(`${API_URL}/add`, { productId });
    
    return res.data;
  }
);

// ✅ Update Quantity
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity }) => {
    const res = await axios.put(`${API_URL}/update`, { productId, quantity });
    return res.data;
  }
);

// ✅ Delete Cart Item
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (cartItemId) => {
    const res = await axios.delete(`${API_URL}/delete`, {
      data: { cartItemId },
    });

    return res.data;
  }
);

export const clearCartFromDB = createAsyncThunk(
  "cart/clearCartFromDB",
  async () => {
    const res = await axios.delete(`${API_URL}/delete/all`);
    return res.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // each item has product details + quantity
    status: "idle",
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload?.products || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // 🔹 Add to Cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.products;
      })

      // 🔹 Update Cart Item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.products;
      })

      // 🔹 Delete Cart Item
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.items = action.payload.products;
      })
      .addCase(clearCartFromDB.fulfilled, (state) => {
        state.items = []; // Clear Redux state too
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
