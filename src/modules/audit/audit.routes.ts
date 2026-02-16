// 

import { Router } from 'express';
import { getAuditLogsHandler } from './audit.controller';

const router = Router();

/**
 * @swagger
 * /api/audit/{entityType}/{entityId}:
 *   get:
 *     summary: Get audit logs for an entity
 *     tags: [Audit]
 *     description: >
 *       Fetches audit logs for a given entity type and entity ID.
 *       Entity types:
 *         - 1 = Menu Item
 *         - 2 = Category
 *     parameters:
 *       - in: path
 *         name: entityType
 *         required: true
 *         schema:
 *           type: integer
 *           enum: [1, 2]
 *         description: Type of entity (1 = Menu Item, 2 = Category)
 *         example: 1
 *       - in: path
 *         name: entityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the entity
 *         example: 10
 *     responses:
 *       200:
 *         description: Audit logs fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 code:
 *                   type: string
 *                   example: AUDIT_LIST
 *                 message:
 *                   type: string
 *                   example: Audit logs fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       entityType:
 *                         type: integer
 *                         example: 1
 *                       entityId:
 *                         type: integer
 *                         example: 10
 *                       fieldName:
 *                         type: string
 *                         example: price
 *                       oldValue:
 *                         type: string
 *                         example: "199"
 *                       newValue:
 *                         type: string
 *                         example: "249"
 *                       changedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-02-12T10:15:30.000Z"
 *       400:
 *         description: Invalid entity type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: string
 *                   example: INVALID_ENTITY_TYPE
 *                 message:
 *                   type: string
 *                   example: Invalid entity type
 */
router.get('/:entityType/:entityId', getAuditLogsHandler);

export default router;
