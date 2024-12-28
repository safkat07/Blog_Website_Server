import StatusCodes from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../Auth/user.model';
import { JwtPayload } from 'jsonwebtoken';
import { Blog } from '../Blog/blog.model';

const BlockUser = async (targatedUserId: string, user: JwtPayload) => {
  const targatedUser = await User.findById(targatedUserId);
  if (!targatedUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  if (targatedUser._id.toString() === user._id.toString()) {
    throw new AppError(StatusCodes.FORBIDDEN, 'You cannot block yourself');
  }
  if (targatedUser.isBlocked) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'This User is already blocked');
  }

  if (user.role !== 'admin') {
    throw new AppError(StatusCodes.FORBIDDEN, 'Only admins can block users');
  }

  if (targatedUser.role === 'admin') {
    throw new AppError(StatusCodes.FORBIDDEN, 'Cannot block an admin');
  }

  const result = await User.findByIdAndUpdate(targatedUserId, {
    isBlocked: true,
  });

  return result;
};

const DeleteBlog = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  return result;
};

const AdminService = { BlockUser, DeleteBlog };

export default AdminService;
