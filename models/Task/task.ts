import mongoose from "mongoose";

export interface TaskType extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  column: "backlog" | "in-progress" | "review" | "done";
  createdBy: string;
}

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
    createdBy: {
      type: String,
      required: [true, "This field is required..."],
    },
  },
  { timestamps: true },
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export { Task };
