import mongoose from "mongoose";
const schema = mongoose.Schema;

const PostSchema = new schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLIC"],
    },
    category: {
      type: schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
