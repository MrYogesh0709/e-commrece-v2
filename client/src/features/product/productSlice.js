import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, updateProduct } from "./productAPI";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  isLoading: false,
  totalItems: 0,
  singleProduct: null,
  error: null,
  productLoading: true,
};

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (productId) => {
    const response = await createProduct(productId);
    return response.data;
  }
);
export const updateProductItemAsync = createAsyncThunk(
  "product/updateProductItem",
  async (items) => {
    const response = await updateProduct(items);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.singleProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
        toast.success("Product created successfully");
      })
      .addCase(createProductAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateProductItemAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductItemAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(
          (items) => items.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.singleProduct = action.payload;
        toast.success("Product updated successfully");
      })
      .addCase(updateProductItemAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearSelectedProduct, clearError } = productSlice.actions;

export const selectAllProducts = (state) => state.product;

export default productSlice.reducer;
