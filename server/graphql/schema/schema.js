// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    user(id: ID!): User!
    isAuth: User!,
    post(id: ID!): Post!,
    posts(sort: SortInput, query: QueryByInput): [Post],
    categories(catId: ID): [Category]!, 
  }

  type User {
    id: ID!
    email: String!
    password: String
    name: String!
    lastName: String!
    token: String!
    posts(sort: SortInput): [Post],
    categories: [Category]
  }

  type Mutation {
    singUp(fields: UserSignUp!): User!
    singIn(fields: AuthInput!): User!
    updateUserProfile(name: String, lastName: String, id: ID!): User!
    updateUserCredit(email: String!, password: String!, id: ID!): User!
    createPost(fields: PostInput): Post!
    createCategory(name: String!): Category!
    updatePost(fields: PostInput, id: ID!): Post!,
    deletePost(id: ID!): Boolean,
    updateCategory(name: String, id: ID!): Category!,
    deleteCategory(id: ID!): Boolean
  }

  type Category {
    id: ID!
    name: String!
    author: User!
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    excerpt: String!
    content: String!
    status: PostStatus!
    created_at: String!
    updated_at: String!
    author: User!,
    categories: Category,
    related(sort: SortInput): [Post]
  }



  input AuthInput {
    email: String!
    password: String!
  }

  input UserSignUp {
    email: String!
    password: String!
    name: String!
    lastName: String!
  }

  input PostInput {
    title: String!
    excerpt: String!
    content: String
    status: PostStatus
    category: ID
  }

  input SortInput {
    sortBy: String,
    orderBy: String,
    limit: Int,
    skip: Int
  }

  input QueryByInput {
    key: String!,
    value: String!
  }

  enum PostStatus {
    PUBLIC
    DRAFT
  }
`;

export { typeDefs };
