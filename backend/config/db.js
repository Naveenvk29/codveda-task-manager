import mongoose from "mongoose";

const DB_NAME = "TaskManagerDB";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      "✅ MongoDB connected successfully at:",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error("❌ Error in DB connection:", error.message);
    process.exit(1);
  }
};

export default connectDB;
