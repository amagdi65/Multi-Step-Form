import { useState } from "react";

export function usePersistentState(key, initialValue) {
    const [state, setState] = useState(() => {
      try {
        const savedValue = localStorage.getItem(key);
        return savedValue !== null
          ? key.includes("formData")
            ? JSON.parse(savedValue)
            : key.includes("currentStep")
            ? parseInt(savedValue, 10)
            : savedValue
          : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });
  
    const setValue = (value) => {
      try {
        const valueToStore = typeof value === "function" ? value(state) : value;
        setState(valueToStore);
        if (typeof valueToStore === "object" || valueToStore == File) {
          localStorage.setItem(key, JSON.stringify(valueToStore));
        } else {
          localStorage.setItem(key, valueToStore.toString());
        }
      } catch (error) {
        console.error(`Error saving to localStorage for key "${key}":`, error);
      }
    };
  
    return [state, setValue];
  }