import { gql } from "graphql-request";

export const loginMutation = gql`
  mutation SignIn($fields: AuthInput!) {
    singIn(fields: $fields) {
      id
      token
      email
    }
  }
`;

export const signUpUserMutation = gql`
  mutation SignUp($fields: UserSignUp!) {
    singUp(fields: $fields) {
      id
      token
      email
    }
  }
`;

export const updateUserCreditMutation = gql`
  mutation UpdateUserCred(
    $email: String!
    $password: String!
    $updateUserCreditId: ID!
  ) {
    updateUserCredit(
      email: $email
      password: $password
      id: $updateUserCreditId
    ) {
      email
      id
      token
    }
  }
`;
