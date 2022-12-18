import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true,
    unique: true,
    lowercase: true,
    maxlength: 100,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
