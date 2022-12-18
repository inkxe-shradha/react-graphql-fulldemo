import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import { compare, genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";

const schema = mongoose.Schema;
const SALT_I = 10;

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
  },
  name: {
    type: String,
    maxlength: 100,
    required: true,
  },
  lastName: {
    type: String,
    maxlength: 100,
  },
  token: {
    type: String,
  },
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    genSalt(SALT_I, function (err, salt) {
      if (err) return next(err);
      hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.generateToken = async function () {
  var user = this;
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.SECRET_KEY,
    {
      expiresIn: "7D",
    }
  );
  user.token = token;
  return user.save();
};

UserSchema.methods.comparePassword = async function (userPassword) {
  return compare(userPassword, this.password).then(function (result) {
    return result;
  });
};

const User = mongoose.model("User", UserSchema);

export default User;
