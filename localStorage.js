export const setItem = (key, value) => (hasItem(key) ? false : localStorage.setItem(key, value));

export const hasItem = key => (localStorage.getItem(key) ? localStorage.getItem(key) : false);

export const updateItem = (key, value) => localStorage.setItem(key, value);
