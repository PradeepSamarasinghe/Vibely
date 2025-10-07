import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPost extends Document {
  title: string;
  description: string;
  img?: string;
  content: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title:       { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, required: true, maxlength: 300 },
    img:         { type: String, default: "" },
    content:     { type: String, required: true },
    username:    { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Avoid model overwrite in dev
export default (mongoose.models.Post as Model<IPost>) ||
  mongoose.model<IPost>("Post", PostSchema);
