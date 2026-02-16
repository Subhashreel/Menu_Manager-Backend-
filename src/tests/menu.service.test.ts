import { listVisibleMenuItems } from '../modules/menu/menu.service';
import { MenuItem } from '../modules/menu/menu.model';

// We only need to mock MenuItem since that's what we call
jest.mock('../modules/menu/menu.model', () => ({
  MenuItem: {
    findAll: jest.fn(),
  },
}));

describe('listVisibleMenuItems', () => {
  it('returns array of visible menu items', async () => {
    (MenuItem.findAll as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Pizza' },
      { id: 2, name: 'Burger' },
    ]);

    const items = await listVisibleMenuItems();

    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBe(2);
    expect(MenuItem.findAll).toHaveBeenCalledTimes(1);
  });
});
