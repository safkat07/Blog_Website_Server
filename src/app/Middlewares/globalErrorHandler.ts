/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import config from '../config';
import { TErrorSources } from '../Interface/error';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = 500;
  let message = 'Something went wrong!';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went Wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simpleError = handleZodError(err);
    statusCode = simpleError?.statusCode;
    message = simpleError?.message;
    errorSources = simpleError?.errorSources;
  } else if (err.name === 'ValidationError') {
    const simpleError = handleValidationError(err);
    statusCode = simpleError?.statusCode;
    message = simpleError?.message;
    errorSources = simpleError?.errorSources;
  } else if (err.name === 'CastError') {
    const simpleError = handleCastError(err);
    statusCode = simpleError?.statusCode;
    message = simpleError?.message;
    errorSources = simpleError?.errorSources;
  } else if (err.code === 11000) {
    const simpleError = handleDuplicateError(err);
    statusCode = simpleError?.statusCode;
    message = simpleError?.message;
    errorSources = simpleError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === 'development' && err?.stack,
  });
};

export default globalErrorHandler;
