import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';

import config from '../config';
import AppError from '../errors/AppError';
import { User } from '../modules/Auth/user.model';

type Role = 'admin' | 'user';

const auth = (...roles: Role[]) => {
  return catchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      const bearer = req.headers.authorization;

      if (!bearer || !bearer.startsWith('Bearer ')) {
        throw new AppError(
          StatusCodes.UNAUTHORIZED,
          'Plesae Enter Authorization Header',
        );
      }

      const token = bearer.split(' ')[1];

      if (!token) {
        throw new AppError(
          StatusCodes.UNAUTHORIZED,
          'You are Uauthorized to access this route',
        );
      }

      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { email } = decoded;

      const user = await User.isUserExists(email);

      if (!user) {
        throw new AppError(
          StatusCodes.UNAUTHORIZED,
          'You are Uauthorized to access this route',
        );
      }

      const isBlocked = user?.isBlocked;

      if (isBlocked) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          'You are Uauthorized to access this route',
        );
      }

      if (roles.length && !roles.includes(user.role)) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          'You are Uauthorized to access this route',
        );
      }

      req.user = user;

      next();
    },
  );
};

export default auth;
