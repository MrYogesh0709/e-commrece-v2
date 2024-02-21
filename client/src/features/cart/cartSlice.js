import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchCartItemsByUserId,
  removeItemFromCart,
  resetCart,
  updateCart,
} from "./cartAPI";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  isLoading: false,
  open: true,
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (product) => {
    const response = await addToCart(product);
    return response.data;
  }
);

export const fetchCartItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchCartItemsByUserId",
  async () => {
    const response = await fetchCartItemsByUserId();
    return response.data;
  }
);

export const updateCartItemAsync = createAsyncThunk(
  "cart/updateCartItem",
  async (items) => {
    const response = await updateCart(items);
    return response.data;
  }
);
export const removeCartItemAsync = createAsyncThunk(
  "cart/removeCartItem",
  async (items) => {
    const response = await removeItemFromCart(items);
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk("cart/resetCart", async () => {
  const response = await resetCart();
  return response.data;
});
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.open = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems.push(action.payload);
        toast.success("Product added successfully");
      })
      .addCase(addToCartAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchCartItemsByUserIdAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItemsByUserIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItemsByUserIdAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCartItemAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.cartItems.findIndex(
          (items) => items.id === action.payload.id
        );
        state.cartItems[index] = action.payload;
      })
      .addCase(updateCartItemAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(removeCartItemAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCartItemAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        toast.success("Cart Item removed");
      })

      .addCase(removeCartItemAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(resetCartAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { openCart } = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
