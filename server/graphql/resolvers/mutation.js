import { User, Post, Category } from "../../db/models/index.js";
import { GraphQLError } from "graphql";
import authorized from "../../utils/authentication.js";
import isValidUser from "../../utils/tools.js";
import { postMutation } from "./mutations/postMutation.js";
import { categoryMutation } from "./mutations/categoryMutation.js";

export const mutation = {
  singIn: async (parent, args, context, info) => {
    try {
      // Check the user exists
      const user = await User.findOne({
        email: args.fields.email,
      });
      if (!user)
        throw new GraphQLError(
          "Invalid Username Or Password. Please try again",
          {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          }
        );
      // Check the password is valid or not
      const checkPassword = await user.comparePassword(args.fields.password);
      if (!checkPassword) {
        throw new GraphQLError(
          "Invalid Username Or Password. Please try again",
          {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          }
        );
      }
      // User must be logged in and token is generateToken
      const getToken = await user.generateToken();
      if (!getToken) {
        throw new GraphQLError("Something went wrong!", {
          extensions: {
            BAD_USER_INPUT,
          },
        });
      }
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: getToken.token,
      };
    } catch (err) {
      throw err;
    }
  },
  singUp: async (parent, args, context, info) => {
    try {
      const user = new User({
        email: args.fields.email,
        password: args.fields.password,
        name: args.fields.name,
        lastName: args.fields.lastName,
      });
      const getToken = await user.generateToken();
      if (!getToken) {
        throw new GraphQLError("Something went wrong!", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const data = await user.save();
      return data;
    } catch (error) {
      if (error.code === 11000) {
        throw new GraphQLError(
          "Duplicated Email Address, Try to signup with a new one",
          {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          }
        );
      }
      throw error;
    }
  },

  updateUserProfile: async (parent, args, context, info) => {
    try {
      const req = authorized(context);
      if (!isValidUser(req, args.id)) {
        throw new GraphQLError("Invalid User requested", {
          extensions: "BAD_REQUEST",
        });
      }

      // ! Validate the arguments passed in the args params object ----------------------------------------------------------------

      const user = await User.findByIdAndUpdate(args.id, {
        $set: {
          name: args.name,
          lastName: args.lastName,
        },
      });

      return user;
    } catch (err) {
      throw err;
    }
  },

  updateUserCredit: async (parent, args, context, info) => {
    try {
      const req = authorized(context);
      if (!isValidUser(req, args.id)) {
        throw new GraphQLError("Invalid User requested", {
          extensions: "BAD_REQUEST",
        });
      }
      const currentUser = await User.findById(args.id);
      if (!currentUser) {
        throw new GraphQLError("Invalid User Details", {
          extensions: "BAD_REQUEST",
        });
      }
      currentUser.email = args.email;
      currentUser.password = args.password;

      // Generate the token for the user
      const getToken = await currentUser.generateToken();
      if (!getToken) {
        throw new GraphQLError("Something went wrong!", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      currentUser.token = getToken.token;
      return await currentUser.save();
    } catch (err) {
      throw err;
    }
  },

  // Post a new user
  createPost: async (parent, { fields }, context, info) => {
    try {
      const auth = authorized(context);
      const post = new Post({
        title: fields.title,
        excerpt: fields.excerpt,
        content: fields.content,
        status: fields.status,
        author: auth.id,
        category: fields.category,
      });

      const result = await post.save();

      return result;
    } catch (error) {
      throw error;
    }
  },

  // create a new category
  createCategory: async (parent, { name }, context, info) => {
    try {
      const req = authorized(context);
      const category = new Category({
        name,
        author: req.id,
      });
      const result = await category.save();
      return result;
    } catch (error) {
      throw err;
    }
  },
  ...postMutation,
  ...categoryMutation,
};
