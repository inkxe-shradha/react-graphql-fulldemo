import mongoose from "mongoose";
import "./models/index.js";
const connectMongoose = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    mongoose.connection
      .once("open", () => console.log("Connected to MongoLab instance."))
      .on("error", (error) =>
        console.log("Error connecting to MongoLab:", error)
      );
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

export default connectMongoose;
