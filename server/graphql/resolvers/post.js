import { Category, Post, User } from "../../db/models/index.js";
import { sortByHelper } from "../../utils/tools.js";

export const PostRelation = {
  author: async (parent, args, context, info) => {
    try {
      const userId = parent.author;
      const user = await User.findById(userId).select("-password");
      return user;
    } catch (error) {
      throw error;
    }
  },
  categories: async (parent, args, context, info) => {
    try {
      const categoryId = parent.category;
      const category = await Category.findById(categoryId);
      return category;
    } catch (error) {
      throw error;
    }
  },
  related: async (parent, args, context, info) => {
    try {
      const sort = sortByHelper(args.sort);
      const posts = await Post.find({
        category: parent.category,
      })
        .sort([[sort.sortBy, sort.orderBy]])
        .skip(sort.skip)
        .limit(sort.limit);
      return posts;
    } catch (error) {
      throw error;
    }
  },
};
