import { Model } from 'mongoose';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}

export type TLoginUser = {
  email: string;
  password: string;
};

export type RegisterType = {
  name: string;
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
