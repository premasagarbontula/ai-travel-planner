import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);

    console.log(chalk.cyan.bold(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(chalk.red.bold("MongoDB Connection Error:", error));
    process.exit(1);
  }
};

export default connectDB;
