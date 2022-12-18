import { Post, User } from "../../db/models/index.js";
export const CategoryRelation = {
  author: async (parent, args, context, info) => {
    try {
      const userId = parent.author;
      const user = await User.findById(userId).select("-password");
      return user;
    } catch (error) {
      throw error;
    }
  },
  posts: async (parent, args, context, info) => {
    try {
      const catId = parent.id;
      const posts = await Post.find({
        category: catId,
      });
      return posts;
    } catch (error) {
      throw error;
    }
  },
};
