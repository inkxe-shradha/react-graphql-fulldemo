import { gql } from "graphql-request";

export const isUserAuthenticated = gql`
  query Authentication {
    isAuth {
      email
      id
      token
    }
  }
`;

export const getUserStacksQuery = gql`
  query GetUser($userId: ID!, $sort: SortInput) {
    user(id: $userId) {
      name
      lastName
      categories {
        id
        name
      }
      posts(sort: $sort) {
        id
        title
      }
    }
  }
`;

export const getCategoriesQuery = gql`
  query AllCategories($catId: ID) {
    categories(catId: $catId) {
      id
      name
    }
  }
`;
