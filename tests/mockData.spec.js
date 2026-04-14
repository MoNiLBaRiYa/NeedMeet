import { describe, it, expect, vi } from 'vitest';
import { mockApi } from '../utils/mockApi';

// Mock Nuxt global functions
global.$fetch = vi.fn();
global.useLocalStorage = vi.fn(() => ({
  getItem: vi.fn(),
  setItem: vi.fn()
}));
global.useNuxtApp = vi.fn();

describe('Mock API Layer (Refined)', () => {
  it('getCategories should return data from JSON', async () => {
    const mockData = [{ id: '1', name: 'Test' }];
    global.$fetch.mockResolvedValueOnce(mockData);

    const result = await mockApi.getCategories();
    expect(result).toEqual(mockData);
    expect(global.$fetch).toHaveBeenCalledWith('/mock-data/categories.json');
  });

  it('getProfessionals should filter by categoryId', async () => {
    const mockData = [
      { id: '1', categoryId: 'cat_1' },
      { id: '2', categoryId: 'cat_2' }
    ];
    global.$fetch.mockResolvedValueOnce(mockData);

    const result = await mockApi.getProfessionals('cat_1');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('createBooking should save to localStorage', async () => {
    const setItemMock = vi.fn();
    global.useLocalStorage.mockReturnValue({
      getItem: vi.fn(() => []),
      setItem: setItemMock
    });

    const bookingData = { customerId: 'u1', professionalId: 'p1' };
    const result = await mockApi.createBooking(bookingData);

    expect(result.id).toContain('book_');
    expect(result.status).toBe('pending');
    expect(setItemMock).toHaveBeenCalled();
  });
});
