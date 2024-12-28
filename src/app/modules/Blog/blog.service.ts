import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import { Blog } from './blog.model';
import { IBLog } from './blog.interface';
import { User } from '../Auth/user.model';
import AppError from '../../errors/AppError';
import { blogSearchableFileds } from './blog.constant';

const CreateBlogIntoDB = async (author: string, payload: IBLog) => {
  const isAuthorExist = await User.findById(author);

  if (!isAuthorExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Author not found in database');
  }

  const result = (await Blog.create({ ...payload, author })).populate({
    path: 'author',
    select: '-role -isBlocked -password',
  });

  return result;
};

const GetAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().populate({
      path: 'author',
      select: '-role -isBlocked -password',
    }),
    query,
  )
    .search(blogSearchableFileds)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await blogQuery.modelQuery;
  return result;
};

const UpdateBlogIntoDB = async (
  id: string,
  author: string,
  payload: Partial<IBLog>,
) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  const isAuthorExist = await User.findById(author);

  if (!isAuthorExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Author not found');
  }

  const isAuthorBlog = blog.author.toString() === author.toString();

  if (!isAuthorBlog) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not authorized to update this blog',
    );
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const DeleteBlogFromDB = async (id: string, author: string) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  const isAuthorExist = await User.findById(author);

  if (!isAuthorExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Author not found');
  }

  const isAuthorBlog = blog.author.toString() === author.toString();

  if (!isAuthorBlog) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not authorized to delete this blog',
    );
  }

  await Blog.findByIdAndDelete(id);
};

export const BlogServices = {
  CreateBlogIntoDB,
  GetAllBlogsFromDB,
  DeleteBlogFromDB,
  UpdateBlogIntoDB,
};
