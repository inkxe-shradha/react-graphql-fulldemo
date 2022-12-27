import { gql } from "graphql-request";

export const createPostMutation = gql`
  mutation CreatePost($fields: PostInput) {
    createPost(fields: $fields) {
      id
      title
    }
  }
`;
