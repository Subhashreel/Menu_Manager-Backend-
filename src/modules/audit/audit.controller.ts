import type { Request, Response } from 'express';
import { getAuditLogs } from './audit.service';
import { sendResponse } from '../../shared/sendResponse';
import { SUCCESS_CODES } from '../../shared/successCodes';
import { AppError } from '../../shared/AppError';

export async function getAuditLogsHandler(req: Request, res: Response) {
  const entityType = Number(req.params.entityType);
  const entityId = Number(req.params.entityId);

  if (![1, 2].includes(entityType)) {
    throw new AppError('INVALID_ENTITY_TYPE');
  }

  const logs = await getAuditLogs(entityType, entityId);
  return sendResponse(res, SUCCESS_CODES.AUDIT_LIST, logs);
}
