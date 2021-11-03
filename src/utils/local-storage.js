export const loadAuthToken = () => localStorage.getItem('authToken');

export const saveAuthToken = (authToken) => {
  try {
    localStorage.setItem('authToken', authToken);
    return 'success';
  } catch (e) {
    return e;
  }
};

export const clearAuthToken = () => {
  try {
    localStorage.removeItem('authToken');
    return 'success';
  } catch (e) {
    return e;
  }
};
