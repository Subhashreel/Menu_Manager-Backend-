import { Router } from 'express';
import { validateBody } from '../../middlewares/validate';
import { upsertMenuSchema } from './menu.validation';
import {
  upsertMenuHandler,
  listMenuTreeHandler,
  listMenuHandler,
  toggleMenuAvailabilityHandler,
  deleteMenuHandler,
} from './menu.controller';

const router = Router();

/**
 * @swagger
 * /api/menu/tree:
 *   get:
 *     summary: Get full menu tree for admin (all categories + all items)
 *     tags: [Menu]
 *     description: >
 *       Returns all categories with all menu items (enabled + disabled),
 *       used for admin management UI (dropdowns, accordions, toggles).
 *     responses:
 *       200:
 *         description: Menu tree fetched successfully
 */
router.get('/tree', listMenuTreeHandler);

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: List menu items with filters (Admin)
 *     tags: [Menu]
 *     parameters:
 *       - in: query
 *         name: availability
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *         description: Filter by availability (0 = disabled, 1 = enabled)
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filter by category
 *     responses:
 *       200:
 *         description: Menu items fetched successfully
 */
router.get('/', listMenuHandler);

/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Create or update menu item (UPSERT)
 *     tags: [Menu]
 *     description: >
 *       Inserts a new menu item if it does not exist, or updates it if the same
 *       menu item exists (based on id).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - categoryId
 *               - availability
 *               - preparationComplexity
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 10
 *               name:
 *                 type: string
 *                 example: "Margherita Pizza"
 *               description:
 *                 type: string
 *                 example: "Classic cheese pizza"
 *               price:
 *                 type: number
 *                 example: 199
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               availability:
 *                 type: boolean
 *                 example: true
 *               preparationComplexity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       201:
 *         description: Menu item created
 *       200:
 *         description: Menu item updated
 */
router.post('/', validateBody(upsertMenuSchema), upsertMenuHandler);

/**
 * @swagger
 * /api/menu/{id}/availability:
 *   patch:
 *     summary: Toggle menu item availability (Admin)
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [availability]
 *             properties:
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Availability updated successfully
 */
router.patch('/:id/availability', toggleMenuAvailabilityHandler);

/**
 * @swagger
 * /api/menu/{id}:
 *   delete:
 *     summary: Delete a menu item (Admin)
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete('/:id', deleteMenuHandler);

export default router;
