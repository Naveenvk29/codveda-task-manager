import mongoose from "mongoose";

const DB_NAME = "TaskManagerDB";

const ConmectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      "MongoDB connected successfully",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("Error in DB connection", error.message);
    process.exit(1);
  }
};
