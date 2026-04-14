export const useLocalStorage = () => {
  /**
   * Save an item to localStorage
   * @param {string} key 
   * @param {any} value 
   */
  const setItem = (key, value) => {
    if (typeof window === 'undefined') return;
    try {
      if (value === null || value === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error-LocalStorage-Set [${key}]:`, error);
    }
  };

  /**
   * Get an item from localStorage
   * @param {string} key 
   * @returns {any | null}
   */
  const getItem = (key) => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error-LocalStorage-Get [${key}]:`, error);
      return null;
    }
  };

  /**
   * Remove an item from localStorage
   * @param {string} key 
   */
  const removeItem = (key) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  };

  return {
    setItem,
    getItem,
    removeItem
  };
};
