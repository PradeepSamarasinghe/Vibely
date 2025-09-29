import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: 300,
    },
    img: {
      type: String, // image URL or path
      default: "",
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    username: {
      type: String, // store username directly
      required: [true, "Username is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
