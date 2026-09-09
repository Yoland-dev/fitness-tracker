import { useState, useEffect } from 'react';

// Custom hook that behaves like useState but persists the value to
// localStorage automatically whenever it changes, and hydrates from
// localStorage on mount.
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (err) {
      return initialValue;
    }
  });

  // Persist to localStorage whenever the value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
