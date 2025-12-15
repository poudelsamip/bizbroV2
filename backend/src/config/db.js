import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo DB Connected");
  } catch (error) {
    console.log("Error connecting to mongo db");
  }
};
