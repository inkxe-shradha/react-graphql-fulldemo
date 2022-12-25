import { signInUserAPI, signUpUserAPI } from "../../Api";
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
