import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/sequelize';

export class AuditLog extends Model {
  declare id: number;
  declare entityType: number;
  declare entityId: number;
  declare fieldName: string;
  declare oldValue?: string;
  declare newValue?: string;
  declare changedBy?: number;
}

AuditLog.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    entityType: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, field: 'entity_type' },
    entityId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, field: 'entity_id' },
    fieldName: { type: DataTypes.STRING(20), allowNull: false, field: 'field_name' },
    oldValue: { type: DataTypes.STRING(20), field: 'old_value' },
    newValue: { type: DataTypes.STRING(20), field: 'new_value' },
    changedBy: { type: DataTypes.INTEGER.UNSIGNED, field: 'changed_by' },
  },
  {
    sequelize,
    tableName: 'audit_logs',
    timestamps: true,
    createdAt: 'changed_at',
    updatedAt: false,
  }
);
