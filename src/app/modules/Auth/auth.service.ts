import config from '../../config';
import AppError from '../../errors/AppError';
import { RegisterType, TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import { User } from './user.model';
import { StatusCodes } from 'http-status-codes';
const UserRegisterIntoDB = async (payload: RegisterType) => {
  const userExist = await User.isUserExists(payload.email);

  if (userExist) {
    throw new AppError(StatusCodes.CONFLICT, 'Same User already exists');
  }
  const user = await User.create({ ...payload, role: 'user' });
  const result = {
    _id: user.id,
    name: user.name,
    email: user.email,
  };
  return result;
};

const UserLogin = async (payload: TLoginUser) => {
  const user = await User.isUserExists(payload.email);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No User Available');
  }
  const userBlocked = user?.isBlocked;
  if (userBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This User is blocked');
  }

  const passwordMatch = await User.isPasswordMatched(
    payload.password,
    user.password,
  );
  if (!passwordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Incorrect Password');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { token };
};

export const AuthServices = {
  UserRegisterIntoDB,
  UserLogin,
};
