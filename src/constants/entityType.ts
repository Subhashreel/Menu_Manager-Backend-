export const ENTITY_TYPE = {
  CATEGORY: 1,
  MENU_ITEM: 2,
} as const;

export type EntityType = (typeof ENTITY_TYPE)[keyof typeof ENTITY_TYPE];
