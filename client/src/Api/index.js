import { gql } from "graphql-request";
import graphQLClient from "../confg/graphqli.config";
// import Axios from "../confg/axios.config";

export const signInUserAPI = async (data) => {
  const mutation = gql`
    mutation SignIn($fields: AuthInput!) {
      singIn(fields: $fields) {
        token
        email
        id
      }
    }
  `;
  const variables = {
    fields: {
      ...data,
    },
  };
  return await graphQLClient.request(mutation, variables);
};
