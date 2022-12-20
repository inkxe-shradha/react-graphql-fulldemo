import { GraphQLClient } from "graphql-request";

const baseURL = "http://localhost:4000/graphql";
const token = localStorage.getItem("token");
const graphQLClient = new GraphQLClient(baseURL, {
  headers: {
    authorization: token ? `Bearer ${token}` : "",
  },
});

export default graphQLClient;
