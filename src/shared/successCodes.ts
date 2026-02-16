export const SUCCESS_CODES = {
  MENU_UPSERTED: {
    code: 'MENU_UPSERTED',
    message: 'Menu item saved successfully',
  },
  MENU_LIST: {
    code: 'MENU_LIST',
    message: 'Menu fetched successfully',
  },
  MENU_DELETED: {
    code: 'MENU_DELETED',
    message: 'Menu item deleted successfully',
  },

  CATEGORY_UPSERTED: {
    code: 'CATEGORY_UPSERTED',
    message: 'Category saved successfully',
  },
  CATEGORY_LIST: {
    code: 'CATEGORY_LIST',
    message: 'Categories fetched successfully',
  },
  CATEGORY_DELETED: {
    code: 'CATEGORY_DELETED',
    message: 'Category deleted successfully',
  },
  MENU_BY_CATEGORY: {
  code: 'MENU_BY_CATEGORY',
  message: 'Menu grouped by category fetched successfully',
  },
  AUDIT_LIST: {
    code: 'AUDIT_LIST',
    message: 'Audit logs fetched successfully',
  },
  MENU_LIST_ALL: { 
    code: 'MENU_LIST_ALL', 
    message: 'All menu items fetched successfully' 
  },
  MENU_DISABLED_BY_CATEGORY: { 
    code: 'MENU_DISABLED_BY_CATEGORY', 
    message: 'Disabled menu items fetched successfully' 
  },
  MENU_AVAILABILITY_UPDATED: { 
    code: 'MENU_AVAILABILITY_UPDATED', 
    message: 'Menu item availability updated successfully' 
  },
  MENU_TREE: {
    code: 'MENU_TREE',
    message: 'Menu tree fetched successfully',
  },
} as const;
