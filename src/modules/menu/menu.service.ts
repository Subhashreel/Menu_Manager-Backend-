import { MenuItem } from './menu.model';
import { Category } from '../category/category.model';
import { COMPLEXITY_MAP } from '../../constants/preparationTime';
import { AppError } from '../../shared/AppError';
import { logFieldChange } from '../audit/audit.service';
import { ENTITY_TYPE } from '../../constants/entityType';

export async function listMenuTree() {
  const categories = await Category.findAll({
    include: [
      {
        model: MenuItem,
        required: false, 
      },
    ],
    order: [
      ['name', 'ASC'],
      [MenuItem, 'name', 'ASC'],
    ],
  });

  return categories.map((cat: any) => ({
    categoryId: cat.id,
    categoryName: cat.name,
    isActive: Boolean(cat.isActive),
    items: (cat.MenuItems || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      availability: Boolean(item.availability),
      preparationComplexity: item.preparationComplexity,
      description: item.description ?? null,   
      categoryId: item.categoryId,       
    })),
  }));
}

export async function listMenuWithFilters(filters: {
  availability?: number;
  categoryId?: number;
}) {
  const where: any = {};
  const categoryWhere: any = {};

  if (filters.availability !== undefined) {
    where.availability = filters.availability;
  }

  if (filters.categoryId !== undefined) {
    where.categoryId = filters.categoryId;
  }

  categoryWhere.isActive = 1; 

  return MenuItem.findAll({
    where,
    include: [
      {
        model: Category,
        where: categoryWhere,
        required: true,
      },
    ],
    order: [['id', 'DESC']],
  });
}

export async function upsertMenuItem(data: any) {
  const key = data.preparationComplexity as keyof typeof COMPLEXITY_MAP;
  if (!COMPLEXITY_MAP[key]) throw new AppError('INVALID_PREPARATION_COMPLEXITY');

  const category = await Category.findByPk(data.categoryId);
  if (!category) throw new AppError('CATEGORY_NOT_FOUND');

  if (data.id) {
    const existing = await MenuItem.findByPk(data.id);
    if (!existing) throw new AppError('MENU_ITEM_NOT_FOUND');

    if (data.price !== undefined && data.price !== existing.price) {
      await logFieldChange({
        entityType: ENTITY_TYPE.MENU_ITEM,
        entityId: existing.id,
        fieldName: 'price',
        oldValue: String(existing.price),
        newValue: String(data.price),
      });
    }

    if (
      typeof data.availability === 'boolean' &&
      data.availability !== Boolean(existing.availability)
    ) {
      await logFieldChange({
        entityType: ENTITY_TYPE.MENU_ITEM,
        entityId: existing.id,
        fieldName: 'availability',
        oldValue: String(Number(existing.availability)),
        newValue: String(Number(data.availability)),
      });
    }

    await existing.update({
      name: data.name,
      description: data.description,
      price: data.price,
      categoryId: data.categoryId,
      availability: data.availability ? 1 : 0,
      preparationComplexity: data.preparationComplexity,
    });

    return existing;
  }

  return MenuItem.create({
    name: data.name,
    description: data.description,
    price: data.price,
    categoryId: data.categoryId,
    availability: data.availability ? 1 : 0,
    preparationComplexity: data.preparationComplexity,
  });
}

export async function toggleMenuAvailability(id: number, availability: boolean) {
  const item = await MenuItem.findByPk(id);
  if (!item) throw new AppError('MENU_ITEM_NOT_FOUND');

  if (Boolean(item.availability) !== availability) {
    await logFieldChange({
      entityType: ENTITY_TYPE.MENU_ITEM,
      entityId: id,
      fieldName: 'availability',
      oldValue: String(Number(item.availability)),
      newValue: String(Number(availability)),
    });
  }

  await item.update({ availability: availability ? 1 : 0 });
  return item;
}

export async function deleteMenuItem(id: number) {
  const existing = await MenuItem.findByPk(id);
  if (!existing) throw new AppError('MENU_ITEM_NOT_FOUND');

  await logFieldChange({
    entityType: ENTITY_TYPE.MENU_ITEM,
    entityId: id,
    fieldName: 'deleted',
    oldValue: 'false',
    newValue: 'true',
  });

  await existing.destroy();
}
