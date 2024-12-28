import { Types } from 'mongoose';

export interface IBLog  {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
};
