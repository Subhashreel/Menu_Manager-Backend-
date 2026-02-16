import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/sequelize';

export class Category extends Model {
  declare id: number;
  declare name: string;
  declare isActive: boolean;
}

Category.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    isActive: { type: DataTypes.TINYINT.UNSIGNED, defaultValue: 1, field: 'is_active' },
  },
  { sequelize, tableName: 'categories', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' }
);
