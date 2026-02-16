import { Category } from './category.model';
import { MenuItem } from '../menu/menu.model';
import { AppError } from '../../shared/AppError';
import { logFieldChange } from '../audit/audit.service';
import { ENTITY_TYPE } from '../../constants/entityType';
import { UniqueConstraintError } from 'sequelize';

export async function upsertCategory(data: { id?: number; name: string; isActive?: boolean }) {
  try {
    if (data.id) {
      const existing = await Category.findByPk(data.id);
      if (!existing) throw new AppError('CATEGORY_NOT_FOUND');

      if (data.name !== existing.name) {
        await logFieldChange({
          entityType: ENTITY_TYPE.CATEGORY,
          entityId: existing.id,
          fieldName: 'name',
          oldValue: existing.name,
          newValue: data.name,
        });
      }

      if (
        typeof data.isActive === 'boolean' &&
        data.isActive !== Boolean(existing.isActive)
      ) {
        await logFieldChange({
          entityType: ENTITY_TYPE.CATEGORY,
          entityId: existing.id,
          fieldName: 'isActive',
          oldValue: String(Number(existing.isActive)),
          newValue: String(Number(data.isActive)),
        });
      }

      await existing.update({
        name: data.name,
        isActive: data.isActive ?? existing.isActive,
      });

      return existing;
    }

    return await Category.create({
      name: data.name,
      isActive: data.isActive ?? true,
    });
  } catch (err: any) {
    if (err instanceof UniqueConstraintError) {
      throw new AppError('CATEGORY_ALREADY_EXISTS');
    }
    throw err;
  }
}


export async function listCategories() {
  return Category.findAll();
}

export async function deleteCategorySafe(id: number) {
  const count = await MenuItem.count({ where: { categoryId: id } });
  if (count > 0) throw new AppError('CATEGORY_HAS_ITEMS');

  const existing = await Category.findByPk(id);
  if (!existing) throw new AppError('CATEGORY_NOT_FOUND');

  await logFieldChange({
    entityType: ENTITY_TYPE.CATEGORY,
    entityId: id,
    fieldName: 'deleted',
    oldValue: 'false',
    newValue: 'true',
  });

  await existing.destroy();
}
