// utils/localStorageHelper.js

export const setItem = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getItem = (key: string) => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
};

export const updateItem = (key: string, newValue: any) => {
  if (typeof window !== "undefined") {
    const existingValue = getItem(key);
    if (existingValue) {
      const updatedValue = { ...existingValue, ...newValue };
      setItem(key, updatedValue);
      return updatedValue;
    }
    return null;
  }
};

export const removeItem = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
