import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAddress,
  editAddress,
  fetchLoggedInUser,
  fetchLoggedInUserOrders,
  removeAddress,
  updatePassword,
  updateUser,
  updateUserProfileImage,
} from "./userAPI";
import { toast } from "react-toastify";

const initialState = {
  //*All information will be fetched and stored auth will used  for logged in
  userInfo: null,
  userOrders: [],
  isLoading: false,
  orderLoading: true,
};

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async () => await fetchLoggedInUser()
);
export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async () => await fetchLoggedInUserOrders()
);
export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (userData, thunkAPI) => await updateUser(userData, thunkAPI)
);
export const addAddressAsync = createAsyncThunk(
  "user/addAddress",
  async (address, thunkAPI) => await addAddress(address, thunkAPI)
);
export const removeAddressAsync = createAsyncThunk(
  "user/removeAddress",
  async (addressId, thunkAPI) => await removeAddress(addressId, thunkAPI)
);
export const editAddressAsync = createAsyncThunk(
  "user/editAddress",
  async ({ data, addressId }, thunkAPI) =>
    await editAddress(data, addressId, thunkAPI)
);
export const updatePasswordAsync = createAsyncThunk(
  "user/updatePassword",
  async (data, thunkAPI) => await updatePassword(data, thunkAPI)
);
export const updateUserProfileImageAsync = createAsyncThunk(
  "user/updateUserProfileImage",
  async (data, thunkAPI) => await updateUserProfileImage(data, thunkAPI)
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.data;
      })
      .addCase(fetchLoggedInUserAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.isLoading = true;
        state.orderLoading = false;
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload.data;
        state.orderLoading = true;
      })
      .addCase(fetchLoggedInUserOrdersAsync.rejected, (state) => {
        state.isLoading = false;
        state.orderLoading = true;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.data;
        toast.success("User Profile updated");
      })
      .addCase(updateUserAsync.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
        toast.error(payload.msg);
      })
      .addCase(addAddressAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddressAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.data;
      })
      .addCase(addAddressAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.msg;
        toast.error(action.payload.msg);
      })
      .addCase(removeAddressAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeAddressAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.data;
      })
      .addCase(removeAddressAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.msg;
        toast.error(action.payload.msg);
      })
      .addCase(editAddressAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAddressAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.data;
      })
      .addCase(editAddressAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.msg;
        toast.error(action.payload.msg);
      })
      .addCase(updatePasswordAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePasswordAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.data.msg);
      })
      .addCase(updatePasswordAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.msg;
        toast.error(action.payload.msg);
      })
      .addCase(updateUserProfileImageAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfileImageAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.data;
        toast.success("Profile Picture Updated");
      })
      .addCase(updateUserProfileImageAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.msg;
        toast.error(action.payload.msg);
      });
  },
});

export const { increment } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
