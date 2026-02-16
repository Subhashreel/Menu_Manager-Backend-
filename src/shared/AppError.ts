import { ERROR_CODES, type ErrorCodeKey } from './errors';

export class AppError extends Error {
  public code: string;
  public httpStatus: number;

  constructor(key: ErrorCodeKey) {
    super(ERROR_CODES[key].message);
    this.code = ERROR_CODES[key].code;
    this.httpStatus = ERROR_CODES[key].httpStatus;
  }
}
