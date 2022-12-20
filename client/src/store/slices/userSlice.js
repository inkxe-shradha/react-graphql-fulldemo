import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInUserAPI } from "../../Api";

const initialState = {
  token: "",
  id: "",
  email: "",
  status: "ideal" || "loading",
  error: "",
};

export const signInUser = createAsyncThunk(
  "user/signInUser",
  async (formData) => {
    try {
      const { singIn } = await signInUserAPI(formData);
      return singIn;
    } catch (error) {
      throw error.message;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export const getUserDetails = (state) => ({
  id: state.User.id,
  email: state.User.email,
});

export const getLoadingState = (state) => state.user.status;
export const getUserToken = (state) => state.user.token;
export const handelUserError = (state) => state.user.error;

const userReducer = userSlice.reducer;
export default userReducer;
