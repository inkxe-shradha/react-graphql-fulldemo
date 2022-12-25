import { createSlice } from "@reduxjs/toolkit";
import { signInUser, signUpUser } from "./userThunk";

const initialState = {
  token: "",
  id: "",
  email: "",
  status: "ideal" || "loading",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    // User Sign In
    builder.addCase(signInUser.pending, (state, { payload }) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {
      state.status = "ideal";
      state.error = "";
    });
    builder.addCase(signInUser.rejected, (state, { error }) => {
      state.status = "ideal";
      state.error = error.message.split(":")[0];
    });

    // User Sign up
    builder.addCase(signUpUser.pending, (state, { payload }) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      state.status = "ideal";
      state.error = "";
    });
    builder.addCase(signUpUser.rejected, (state, { error }) => {
      state.status = "ideal";
      state.error = error.message.split(":")[0];
    });
  },
});

export const getUserDetails = (state) => ({
  id: state.User.id,
  email: state.User.email,
});

export const { resetError } = userSlice.actions;

export const getLoadingState = (state) => state.user.status;
export const getUserToken = (state) => state.user.token;
export const handelUserError = (state) => state.user.error;

const userReducer = userSlice.reducer;
export default userReducer;
