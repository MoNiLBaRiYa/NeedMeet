export const useMessagePopup = () => {
  const popups = useState('popups', () => []);

  const addPopup = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    popups.value.push({ id, message, type });
    
    if (duration > 0) {
      setTimeout(() => {
        removePopup(id);
      }, duration);
    }
  };

  const removePopup = (id) => {
    popups.value = popups.value.filter(p => p.id !== id);
  };

  return {
    popups,
    addPopup,
    removePopup
  };
};
