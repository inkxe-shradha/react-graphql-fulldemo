import graphQLClient from "../confg/graphqli.config";
import { loginMutation, signUpUserMutation } from "./mutations/signInMutation";
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
