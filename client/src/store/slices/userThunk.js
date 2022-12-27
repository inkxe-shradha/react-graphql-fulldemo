import {
  createPostAPI,
  getUserAuthStatus,
  getUserStacksAPI,
  signInUserAPI,
  signUpUserAPI,
  updateUserCreditAPI,
} from "../../Api";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (formData) => {
    try {
      const { singUp } = await signUpUserAPI(formData);
      return singUp;
    } catch (error) {
      throw error.message;
    }
  }
);

export const isUserAuthenticated = createAsyncThunk(
  "user/isUserAuthenticated",
  async () => {
    try {
      const { isAuth } = await getUserAuthStatus();
      return isAuth;
    } catch (error) {
      throw error.message;
    }
  }
);

export const updateUserCredentials = createAsyncThunk(
  "user/updateUserCredentials",
  async (formData) => {
    try {
      const { updateUserCredit } = await updateUserCreditAPI(formData);
      return updateUserCredit;
    } catch (error) {
      throw error.message;
    }
  }
);

export const getUserStacks = createAsyncThunk(
  "user/getUserStacks",
  async (id) => {
    try {
      const { user } = await getUserStacksAPI(id);
      return user;
    } catch (error) {
      throw error.message;
    }
  }
);

export const createPost = createAsyncThunk(
  "user/createPost",
  async (formData) => {
    try {
      const { createPost } = await createPostAPI(formData);
      return createPost;
    } catch (error) {
      throw error.message;
    }
  }
);
