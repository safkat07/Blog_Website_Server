import { z } from 'zod';

const LoginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email should be a string',
      })
      .email('Invalid email format'),
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password should be a string',
    }),
  }),
});

const RegisterValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name should be a string',
      })
      .min(3, 'Name should be at least 3 characters')
      .max(30, 'Name should be at most 30 characters'),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email should be a string',
      })
      .email('Email should be a valid email'),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password should be a string',
      })
      .min(6, 'Password should be at least 6 characters'),
  }),
});

const AuthValidation = { LoginValidationSchema, RegisterValidationSchema };

export default AuthValidation;
