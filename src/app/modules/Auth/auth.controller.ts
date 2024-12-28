import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { StatusCodes } from 'http-status-codes';
import { AuthServices } from './auth.service';

const CreateUser = catchAsync(async (req, res) => {
  const result = await AuthServices.UserRegisterIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const LoginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.UserLogin(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

export const UserControllers = {
  CreateUser,
  LoginUser,
};
