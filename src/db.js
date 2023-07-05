import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://mongodb:27017/LOGIN_REACT");
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};
