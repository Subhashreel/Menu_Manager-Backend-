import { AuditLog } from './audit.model';

export async function logFieldChange(params: {
  entityType: number;
  entityId: number;
  fieldName: string;
  oldValue?: string;
  newValue?: string;
  changedBy?: number;
}) {
  return AuditLog.create({
    entityType: params.entityType,
    entityId: params.entityId,
    fieldName: params.fieldName,
    oldValue: params.oldValue ?? null,
    newValue: params.newValue ?? null,
    changedBy: params.changedBy ?? null,
  });
}

export async function getAuditLogs(entityType: number, entityId: number) {
  return AuditLog.findAll({
    where: { entityType, entityId },
    order: [['changed_at', 'DESC']],
  });
}
