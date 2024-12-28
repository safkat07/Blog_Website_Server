import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { BlogServices } from './blog.service';
import sendResponse from '../../utils/sendResponse';

const GetAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.GetAllBlogsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All Blogs Retrived successfully',
    data: result,
  });
});

const CreateBlog = catchAsync(async (req, res) => {
  const author = req.user._id;
  const result = await BlogServices.CreateBlogIntoDB(author, req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Blog created successfully',
    data: result,
  });
});

const UpdateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const author = req.user._id;
  const result = await BlogServices.UpdateBlogIntoDB(id, author, req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Blog updated successfully',
    data: result,
  });
});

const DeleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const author = req.user._id;
  const result = await BlogServices.DeleteBlogFromDB(id, author);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Blog deleted successfully',
    data: result,
  });
});

export const BlogController = {
  GetAllBlogs,
  CreateBlog,
  UpdateBlog,
  DeleteBlog,
};
