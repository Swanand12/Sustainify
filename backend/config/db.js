import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB Database `);
  } catch (error) {
    console.log(`Error in MongoDB ${error}`);
  }
};

export default ConnectDB;
