export const ERROR_CODES = {
  CATEGORY_NOT_FOUND: {
    code: 'CATEGORY_NOT_FOUND',
    httpStatus: 404,
    message: 'Category not found',
  },
  CATEGORY_HAS_ITEMS: {
    code: 'CATEGORY_HAS_ITEMS',
    httpStatus: 409,
    message: 'Category cannot be deleted because menu items exist',
  },
  MENU_ITEM_NOT_FOUND: {
    code: 'MENU_ITEM_NOT_FOUND',
    httpStatus: 404,
    message: 'Menu item not found',
  },
  INVALID_PREPARATION_COMPLEXITY: {
    code: 'INVALID_PREPARATION_COMPLEXITY',
    httpStatus: 422,
    message: 'Invalid preparation complexity value',
  },
  VALIDATION_FAILED: {
    code: 'VALIDATION_FAILED',
    httpStatus: 422,
    message: 'Request validation failed',
  },
  INVALID_ENTITY_TYPE: {
    code: 'INVALID_ENTITY_TYPE',
    httpStatus: 400,
    message: 'Invalid entity type',
  },
  INTERNAL_ERROR: {
    code: 'INTERNAL_ERROR',
    httpStatus: 500,
    message: 'Internal server error',
  },
  CATEGORY_ALREADY_EXISTS: {
  code: 'CATEGORY_ALREADY_EXISTS',
  message: 'Category with the same name already exists',
  httpStatus: 409,
},
} as const;

export type ErrorCodeKey = keyof typeof ERROR_CODES;
