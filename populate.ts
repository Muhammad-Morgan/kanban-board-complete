import "dotenv/config";
import dbConnect from "./lib/dbConnect";
import { Task } from "./models/Task/task";
import data from "./data.json";

const start = async () => {
  try {
    await dbConnect();
    await Task.create(data);
    console.log("Done...");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
