import { GraphQLError } from "graphql";
import { Post } from "../../../db/models/index.js";
import authorized from "../../../utils/authentication.js";
import isValidUser from "../../../utils/tools.js";

export const postMutation = {
  updatePost: async (parent, { fields, id }, context, info) => {
    try {
      const req = authorized(context);
      const post = await Post.findById(id);
      if (!isValidUser(req, post.author)) {
        throw new GraphQLError("Invalid User Details", {
          extensions: "BAD_REQUEST",
        });
      }
      post.title = fields.title || post.title;
      post.excerpt = fields.excerpt || post.excerpt;
      post.content = fields.content || post.content;
      post.status = fields.status || post.status;
      post.category = fields.category || post.category;

      return await post.save();
    } catch (error) {
      throw error;
    }
  },
  deletePost: async (parent, { id }, context, info) => {
    const req = authorized(context);
    const post = await Post.findById(id);
    if (!post) {
      throw new GraphQLError("User not find. Please try again later.", {
        extensions: "BAD_REQUEST",
      });
    }
    if (!isValidUser(req, post.author)) {
      throw new GraphQLError("Invalid User Details", {
        extensions: "BAD_REQUEST",
      });
    }
    const status = await Post.findByIdAndDelete(id);
    return status ? true : false;
  },
};
