import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderAPI";

const initialState = {
  orders: [],
  isLoading: false,
  currentOrder: null,
  totalOrders: 0,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (items) => {
    const response = await createOrder(items);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrderAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectOrder = (state) => state.order;

export default orderSlice.reducer;
