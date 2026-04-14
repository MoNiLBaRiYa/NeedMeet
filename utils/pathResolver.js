/**
 * Utility to resolve "full paths" in the data to browser-friendly paths.
 * The data uses 'public/images/...', but the browser expects '/images/...'
 * 
 * @param {string} path 
 * @returns {string}
 */
export const resolveImagePath = (path) => {
  if (!path) return '/images/default.jpg';
  
  // If the path starts with 'public/', remove it
  if (path.startsWith('public/')) {
    return '/' + path.substring(7);
  }
  
  // If no prefix, ensure it starts with /
  return path.startsWith('/') ? path : '/' + path;
};
