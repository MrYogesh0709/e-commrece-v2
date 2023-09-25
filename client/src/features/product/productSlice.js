import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchAllBrands,
  fetchAllCategory,
  fetchProductById,
  fetchProductsByFilters,
  updateProduct,
} from "./productAPI";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  isLoading: true,
  totalItems: 0,
  singleProduct: null,
  error: null,
  productLoading: true,
};

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchFilteredProducts",
  async ({ filter, sort, pagination, admin, search }) => {
    const response = await fetchProductsByFilters(
      filter,
      sort,
      pagination,
      admin,
      search
    );
    return response.data;
  }
);

export const fetchAllCategoryAsync = createAsyncThunk(
  "product/fetchAllCategory",
  async () => {
    const response = await fetchAllCategory();
    return response.data;
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  "product/fetchAllBrands",
  async () => {
    const response = await fetchAllBrands();
    return response.data;
  }
);

export const fetchSingleProductAsync = createAsyncThunk(
  "product/fetchSingleProduct",
  async (productId, thunkAPI) => await fetchProductById(productId, thunkAPI)
);

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
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.productLoading = false;
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductsByFiltersAsync.rejected, (state) => {
        state.productLoading = false;
      })
      .addCase(fetchAllCategoryAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCategoryAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategoryAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = action.payload;
      })
      .addCase(fetchAllBrandsAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchSingleProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
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
