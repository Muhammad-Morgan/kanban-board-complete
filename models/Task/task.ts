import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
    },
    column: {
      type: String,
      enum: ["backlog", "in-progress", "review", "done"],
      default: "backlog",
    },
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);
export { Task };
