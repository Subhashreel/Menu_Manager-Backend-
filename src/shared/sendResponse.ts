import type { Response } from 'express';

export function sendResponse<T>(
  res: Response,
  success: { code: string; message: string },
  data?: T
) {
  return res.json({
    success: true,
    code: success.code,
    message: success.message,
    data,
  });
}
