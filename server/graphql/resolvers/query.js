import User from "../../db/models/user.js";
import authorized from "../../utils/authentication.js";
import { GraphQLError } from "graphql";
import { Category, Post } from "../../db/models/index.js";
import { sortByHelper } from "../../utils/tools.js";

export const query = {
  user: async (parent, args, context, info) => {
    try {
      const authUser = authorized(context);
      const user = await User.findById(args.id);
      if (String(authUser.id) !== String(user.id)) {
        throw new GraphQLError("Invalid User requested", {
          extensions: "BAD_REQUEST",
        });
      }
      return user;
    } catch (error) {
      throw error;
    }
  },
  isAuth: async (parent, args, context, info) => {
    try {
      const authUser = authorized(context, true);
      if (!authUser.id)
        throw new GraphQLError("Invalid User requested", {
          extensions: "BAD_REQUEST",
        });
      return {
        id: authUser.id,
        email: authUser.email,
        token: authUser.token,
      };
    } catch (error) {
      throw error;
    }
  },
  categories: async (parent, { catId }, context, info) => {
    try {
      if (catId !== "null") {
        const categories = await Category.findById(catId);
        return [categories];
      }
      const categories = await Category.find({});
      return categories;
    } catch (error) {
      throw error;
    }
  },
  post: async (parent, { id }, context, info) => {
    try {
      const post = await Post.findById(id);
      return post;
    } catch (error) {
      throw error;
    }
  },

  posts: async (parent, { sort, query }, context, info) => {
    try {
      let queryBy = {};
      let sortBy = sortByHelper(sort);
      if (query) {
        queryBy[query.key] = query.value;
      }
      const sortObj = {
        [sortBy.sortBy]: sortBy.orderBy,
      };
      const posts = await Post.find(queryBy)
        .sort({ ...sortObj })
        .skip(sortBy.skip)
        .limit(sortBy.limit);
      return posts;
    } catch (error) {
      throw error;
    }
  },
};
