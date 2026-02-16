import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/sequelize';
import { Category } from '../category/category.model';

export class MenuItem extends Model {
  declare id: number;
  declare name: string;
  declare price: number;
  declare availability: boolean;
  declare categoryId: number;
  declare preparationComplexity: number;
}

MenuItem.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(25), allowNull: false },
    description: { type: DataTypes.STRING(255) },
    price: { type: DataTypes.DECIMAL(8, 2).UNSIGNED, allowNull: false },
    categoryId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, field: 'category_id' },
    availability: { type: DataTypes.TINYINT.UNSIGNED, defaultValue: 1 },
    preparationComplexity: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, field: 'preparation_complexity' },
  },
  { sequelize, tableName: 'menu_items', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' }
);

MenuItem.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(MenuItem, { foreignKey: 'categoryId' });
