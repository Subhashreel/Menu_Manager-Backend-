import type { Request, Response } from 'express';
import {
  upsertMenuItem,
  listMenuWithFilters,
  toggleMenuAvailability,
  deleteMenuItem,
} from './menu.service';
import { sendResponse } from '../../shared/sendResponse';
import { SUCCESS_CODES } from '../../shared/successCodes';
import { listMenuTree} from './menu.service';

export async function listMenuTreeHandler(_req: Request, res: Response) {
  const tree = await listMenuTree();
  return sendResponse(res, SUCCESS_CODES.MENU_TREE, tree);
}

export async function listMenuHandler(req: Request, res: Response) {
  const availability =
    req.query.availability !== undefined
      ? Number(req.query.availability)
      : undefined;

  const categoryId =
    req.query.categoryId !== undefined
      ? Number(req.query.categoryId)
      : undefined;

  const items = await listMenuWithFilters({
    availability,
    categoryId,
  });

  return sendResponse(res, SUCCESS_CODES.MENU_LIST, items);
}

export async function upsertMenuHandler(req: Request, res: Response) {
  const item = await upsertMenuItem(req.body);
  return sendResponse(res, SUCCESS_CODES.MENU_UPSERTED, item);
}

export async function toggleMenuAvailabilityHandler(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { availability } = req.body;

  const item = await toggleMenuAvailability(id, availability);
  return sendResponse(res, SUCCESS_CODES.MENU_AVAILABILITY_UPDATED, item);
}

export async function deleteMenuHandler(req: Request, res: Response) {
  await deleteMenuItem(Number(req.params.id));
  return sendResponse(res, SUCCESS_CODES.MENU_DELETED);
}
