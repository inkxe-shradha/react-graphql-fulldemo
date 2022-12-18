import { Category, Post } from "../../db/models/index.js";
import { sortByHelper } from "../../utils/tools.js";

export const UserRelation = {
  posts: async (parent, args, context, info) => {
    try {
      const sort = sortByHelper(args.sort);
      const userId = parent.id;
      const posts = await Post.find({
        author: userId,
      })
        .sort([[sort.sortBy, sort.orderBy]])
        .skip(sort.skip)
        .limit(sort.limit);
      return posts;
    } catch (error) {
      throw error;
    }
  },
  categories: async (parent, args, context, info) => {
    try {
      const userId = parent.id;
      const categories = await Category.find({
        author: userId,
      });
      return categories;
    } catch (error) {
      throw error;
    }
  },
};
