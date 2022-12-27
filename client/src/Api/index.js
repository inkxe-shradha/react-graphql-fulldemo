import graphQLClient from "../confg/graphqli.config";
import { createPostMutation } from "./mutations/addPostMutation";
import {
  loginMutation,
  signUpUserMutation,
  updateUserCreditMutation,
} from "./mutations/signInMutation";
import {
  getCategoriesQuery,
  getUserStacksQuery,
  isUserAuthenticated,
} from "./query";
// import Axios from "../confg/axios.config";

export const signInUserAPI = async (data) => {
  const variables = {
    fields: {
      ...data,
    },
  };
  return await graphQLClient.request(loginMutation, variables);
};

export const signUpUserAPI = async (data) => {
  const variables = {
    fields: {
      email: data.email,
      name: data.name,
      password: data.password,
      lastName: data.lname,
    },
  };
  return await graphQLClient.request(signUpUserMutation, variables);
};

export const getUserAuthStatus = async () => {
  return await graphQLClient.request(isUserAuthenticated, {});
};

export const updateUserCreditAPI = async (data) => {
  const variables = {
    email: data.email,
    password: data.password,
    updateUserCreditId: data.id,
  };
  return await graphQLClient.request(updateUserCreditMutation, variables);
};

export const getUserStacksAPI = async (id) => {
  const variables = {
    userId: id,
    sort: {
      sortBy: "id",
      orderBy: "desc",
      limit: 5,
      skip: 0,
    },
  };
  return graphQLClient.request(getUserStacksQuery, variables);
};

export const getAllCategories = async () => {
  return graphQLClient.request(getCategoriesQuery, {
    catId: "null",
  });
};

export const createPostAPI = async (data) => {
  return graphQLClient.request(createPostMutation, { fields: data });
};
