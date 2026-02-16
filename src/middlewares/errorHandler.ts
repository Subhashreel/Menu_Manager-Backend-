import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/AppError';
import { ERROR_CODES } from '../shared/errors';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.httpStatus).json({
      success: false,
      code: err.code,
      message: err.message,
    });
  }

  return res.status(ERROR_CODES.INTERNAL_ERROR.httpStatus).json({
    success: false,
    code: ERROR_CODES.INTERNAL_ERROR.code,
    message: ERROR_CODES.INTERNAL_ERROR.message,
  });
}
