import { Router } from 'express';
import { validateBody } from '../../middlewares/validate';
import { upsertCategorySchema } from './category.validation';
import {
  upsertCategoryHandler,
  listCategoriesHandler,
  deleteCategoryHandler,
} from './category.controller';

const router = Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: List all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Categories list
 */
router.get('/', listCategoriesHandler);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create or update category (UPSERT)
 *     tags: [Category]
 *     description: >
 *       Creates a new category if id is not provided, or updates the category
 *       if id is present.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Starters"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Category created
 *       200:
 *         description: Category updated
 */
router.post('/', validateBody(upsertCategorySchema), upsertCategoryHandler);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete category safely (only if no items mapped)
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 *       409:
 *         description: Category has items mapped
 */
router.delete('/:id', deleteCategoryHandler);

export default router;
