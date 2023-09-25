import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createReview,
  deleteReview,
  getSingleProductReviews,
  updateReview,
} from "./reviewAPI";
import { toast } from "react-toastify";

const initialState = {
  isLoading: true,
  error: null,
  reviews: [],
  totalReviews: null,
};

export const createReviewAsync = createAsyncThunk(
  "review/createReview",
  async (data, thunkAPI) => await createReview(data, thunkAPI)
);
export const updateReviewAsync = createAsyncThunk(
  "review/updateReview",
  async (data, thunkAPI) => await updateReview(data, thunkAPI)
);
export const getSingleProductReviewsAsync = createAsyncThunk(
  "review/singleProductReview",
  async (productId, thunkAPI) =>
    await getSingleProductReviews(productId, thunkAPI)
);
export const deleteReviewAsync = createAsyncThunk(
  "review/deleteReview",
  async (reviewId, thunkAPI) => await deleteReview(reviewId, thunkAPI)
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createReviewAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReviewAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews.push(action.payload.data.review);
        state.totalReviews = state.reviews.length;
      })
      .addCase(createReviewAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateReviewAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateReviewAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = state.reviews.map((review) =>
          review._id === action.payload.data.review._id
            ? action.payload.data.review
            : review
        );
      })
      .addCase(updateReviewAsync.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(getSingleProductReviewsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProductReviewsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data.reviews;
        state.totalReviews = action.payload.data.count;
      })
      .addCase(getSingleProductReviewsAsync.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(deleteReviewAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReviewAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload.data.review._id
        );
        state.totalReviews = state.reviews.length;
        toast.success("Review removed");
      })
      .addCase(deleteReviewAsync.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export const selectReview = (state) => state.review;

export default reviewSlice.reducer;
