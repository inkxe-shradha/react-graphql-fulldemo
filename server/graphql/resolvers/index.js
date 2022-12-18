import { CategoryRelation } from "./category.js";
import { mutation } from "./mutation.js";
import { PostRelation } from "./post.js";
import { query } from "./query.js";
import { UserRelation } from "./user.js";

const resolvers = {
  Query: query,
  Mutation: mutation,
  User: UserRelation,
  Post: PostRelation,
  Category: CategoryRelation,
};

export default resolvers;
