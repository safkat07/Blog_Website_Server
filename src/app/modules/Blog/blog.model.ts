import mongoose, { Schema } from 'mongoose';
import { IBLog } from './blog.interface';

const BlogSchema = new mongoose.Schema<IBLog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Blog = mongoose.model<IBLog>('Blog', BlogSchema);
