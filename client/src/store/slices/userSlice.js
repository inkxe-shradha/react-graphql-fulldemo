import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  getUserStacks,
  isUserAuthenticated,
  signInUser,
  signUpUser,
  updateUserCredentials,
} from "./userThunk";

const initialState = {
  token: "",
  id: "",
  name: "",
  email: "",
  isUserAuthenticated: false,
  status: "ideal" || "loading",
  error: "",
  categories: [],
  posts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
    logOutUser: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // User Sign In
    builder.addCase(signInUser.pending, (state, { payload }) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(
      signInUser.fulfilled,
      (state, { payload: { email, id, token } }) => {
        state.status = "ideal";
        state.email = email;
        state.id = id;
        state.token = token;
        state.error = "";
      }
    );
    builder.addCase(signInUser.rejected, (state, { error }) => {
      state.status = "ideal";
      state.error = error.message.split(":")[0];
    });

    // User Sign up
    builder.addCase(signUpUser.pending, (state, { payload }) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(
      signUpUser.fulfilled,
      (state, { payload: { email, id, token } }) => {
        state.status = "ideal";
        state.error = "";
        state.email = email;
        state.id = id;
        state.token = token;
      }
    );
    builder.addCase(signUpUser.rejected, (state, { error }) => {
      state.status = "ideal";
      state.error = error.message.split(":")[0];
    });

    // User Authentication
    builder.addCase(isUserAuthenticated.pending, (state, { payload }) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(
      isUserAuthenticated.fulfilled,
      (state, { payload: { email, id, token } = {} }) => {
        state.status = "ideal";
        state.email = email;
        state.id = id;
        state.token = token;
        state.isUserAuthenticated = true;
      }
    );
    builder.addCase(isUserAuthenticated.rejected, (state, { error }) => {
      state.status = "ideal";
      state.error = error.message.split(":")[0];
    });

    // User Update Authentication
    builder.addCase(updateUserCredentials.fulfilled, (state, { payload }) => {
      state.status = "ideal";
      state.email = payload.email;
      state.id = payload.id;
      state.token = payload.token;
    });
    builder.addCase(updateUserCredentials.rejected, (state, { error }) => {
      state.status = "ideal";
      state.error = error.message.split(":")[0];
    });

    // Fetch User Stacks
    builder.addCase(getUserStacks.pending, (state, { payload }) => {
      state.status = "loading";
    });

    builder.addCase(getUserStacks.fulfilled, (state, { payload }) => {
      state.status = "ideal";
      state.name = payload.name + " " + payload.lastName;
      state.categories = payload.categories;
      state.posts = payload.posts;
    });

    // Create new Posts
    builder.addCase(createPost.pending, (state, { payload }) => {
      state.status = "loading";
    });

    builder.addCase(createPost.fulfilled, (state, { payload }) => {
      state.status = "ideal";
      state.posts = [...state.posts, payload];
    });
  },
});

export const { resetError, logOutUser } = userSlice.actions;

export const getUserDetails = (state) => ({
  id: state.user.id,
  email: state.user.email,
  name: state.user.name,
  lastName: state.user.lastName,
  categories: state.user.categories,
  posts: state.user.posts,
});

export const getLoadingState = (state) => state.user.status;
export const getUserToken = (state) => state.user.token;
export const handelUserError = (state) => state.user.error;

const userReducer = userSlice.reducer;
export default userReducer;
