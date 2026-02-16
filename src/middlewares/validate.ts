import type { ZodSchema } from 'zod';
import { AppError } from '../shared/AppError';

export const validateBody =
  (schema: ZodSchema) => (req: any, _res: any, next: any) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('VALIDATION_FAILED');
    }
    req.body = parsed.data;
    next();
  };
