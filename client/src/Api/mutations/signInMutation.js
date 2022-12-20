import { gql } from "@apollo/client";

export const loginMutation = gql`
  mutation SignIn($fields: AuthInput!) {
    singIn(fields: $fields) {
      token
      email
    }
  }
`;
