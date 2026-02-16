import { z } from 'zod';

export const upsertCategorySchema = z.object({
  id: z.number().int().positive().optional(), // present = update, absent = create
  name: z.string().min(2),
  isActive: z.boolean().optional().default(true),
});
