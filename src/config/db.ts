import mongoose from "mongoose";

import path from "path"; 
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../.env") });

export const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.DB_URI as string | undefined;
    if (!uri) {
      console.warn("DB_URI is not defined. Skipping DB connection (dev mode).\nStatic files and non-DB routes will still work.");
      return;
    }
    await mongoose.connect(uri);

    console.log("MongoDB connected successfully");
  } catch (error: any) {
    console.error("MongoDB connection failed:", error?.message || error);
  }
};

export default connectDB;
