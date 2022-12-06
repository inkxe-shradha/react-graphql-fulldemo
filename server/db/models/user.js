import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

const schema = mongoose.Schema;

const UserSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, "Invalid email address"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 32,
    validate: [],
  },
});

mongoose.model("User", UserSchema);

export default UserSchema;
