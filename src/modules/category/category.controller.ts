import type { Request, Response } from 'express';
import { upsertCategory, listCategories, deleteCategorySafe } from './category.service';
import { sendResponse } from '../../shared/sendResponse';
import { SUCCESS_CODES } from '../../shared/successCodes';

export async function upsertCategoryHandler(req: Request, res: Response) {
  const category = await upsertCategory(req.body);
  return sendResponse(res, SUCCESS_CODES.CATEGORY_UPSERTED, category);
}

export async function listCategoriesHandler(_req: Request, res: Response) {
  const categories = await listCategories();
  return sendResponse(res, SUCCESS_CODES.CATEGORY_LIST, categories);
}

export async function deleteCategoryHandler(req: Request, res: Response) {
  await deleteCategorySafe(Number(req.params.id));
  return sendResponse(res, SUCCESS_CODES.CATEGORY_DELETED);
}
