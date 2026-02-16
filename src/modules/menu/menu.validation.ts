import { z } from 'zod';

export const upsertMenuSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  categoryId: z.number().int().positive(),
  availability: z.boolean(),
  preparationComplexity: z.number().int().min(1).max(3),
});
