import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkUser,
  createUser,
  forgotPasswordRequest,
  loginUser,
  resetPassword,
  signOutUser,
  verifyMail,
  verifyMailAgain,
} from "./authAPI";
import { toast } from "react-toastify";

const initialState = {
  user: null, //* THIS show only => "id","role" nothing else //token
  status: "idle",
  error: null,
  errorSignUp: null,
  errorLogin: null,
  msg: null, //* password related
  verifyMailStatus: true, //mail check
  mailError: false, //mail check
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (data, thunkAPI) => await createUser(data, thunkAPI)
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkAPI) => await loginUser(user, thunkAPI)
);
export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (_, thunkAPI) => await checkUser(_, thunkAPI)
);

export const signOutUserAsync = createAsyncThunk(
  "auth/signOutUser",
  async (_, thunkAPI) => await signOutUser(_, thunkAPI)
);

export const forgotPasswordRequestAsync = createAsyncThunk(
  "auth/forgotPassword",
  async (data, thunkAPI) => await forgotPasswordRequest(data, thunkAPI)
);
export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => await resetPassword(data, thunkAPI)
);
export const verifyMailAsync = createAsyncThunk(
  "auth/verifyMail",
  async (data, thunkAPI) => await verifyMail(data, thunkAPI)
);
export const verifyMailAgainAsync = createAsyncThunk(
  "auth/verifyMailAgain",
  async (data, thunkAPI) => await verifyMailAgain(data, thunkAPI)
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
        state.msg = null;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // state.user = action.payload;
        // toast.success("SignUp successfully");
        state.msg = action.payload.msg;
        toast.success("Check your mail for verification and Login In");
      })
      .addCase(createUserAsync.rejected, (state, { payload }) => {
        state.status = "failed";
        state.errorSignUp = payload;
        toast.error(payload);
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        toast.success("login successfully");
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.errorLogin = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
        state.checkUser = true;
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "failed";
        // state.error = action.payload;
      })
      .addCase(signOutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutUserAsync.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
      })
      .addCase(signOutUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(forgotPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
        state.msg = null;
      })
      .addCase(forgotPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.msg = action.payload.msg;
        toast.success("Please Check Your Email For Reset Password");
      })
      .addCase(forgotPasswordRequestAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.msg;
        toast.error(action.payload.msg);
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
        state.msg = null;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.msg = action.payload.msg;
        toast.success("Password Reset Successfully");
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(verifyMailAsync.pending, (state) => {
        state.verifyMailStatus = true;
        state.mailError = false;
      })
      .addCase(verifyMailAsync.fulfilled, (state) => {
        state.verifyMailStatus = false;
        state.mailError = false;
        toast.success("Mail verified successfully please login");
      })
      .addCase(verifyMailAsync.rejected, (state, action) => {
        state.verifyMailStatus = false;
        state.mailError = true;
        toast.error(action.payload.msg);
      })
      .addCase(verifyMailAgainAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyMailAgainAsync.fulfilled, (state) => {
        state.status = "idle";
        toast.success("Mail Sent..");
      })
      .addCase(verifyMailAgainAsync.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload.msg);
      });
  },
});

export const { increment } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
