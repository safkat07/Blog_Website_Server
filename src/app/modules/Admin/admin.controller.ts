import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AdminService from './admin.services';

const BlockUser = catchAsync(async (req, res) => {
  const targatedUserId = req.params.userId;
  const user = req.user;
  const result = await AdminService.BlockUser(targatedUserId, user);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User blocked successfully',
    data: result,
  });
});

const DeleteBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AdminService.DeleteBlog(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Blog deleted successfully',
    data: result,
  });
});

export const AdminController = { BlockUser, DeleteBlog };
