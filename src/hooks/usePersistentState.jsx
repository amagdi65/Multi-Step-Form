import { useState } from "react";

export function usePersistentState(key, initialValue) {
    const [state, setState] = useState(() => {
      try {
        const savedValue = localStorage.getItem(key);
        if (savedValue === null) return initialValue;

        const parsedValue = JSON.parse(savedValue);
        
        if (key === "formData" && parsedValue.profileImage?.data) {
          const { data, type, name } = parsedValue.profileImage;
          const byteCharacters = atob(data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const file = new File([byteArray], name, { type });
          return { ...parsedValue, profileImage: file };
        }

        return parsedValue;
      } catch (error) {
        console.error("Error reading from localStorage:", error);
        return initialValue;
      }
    });
  
    const setValue = (value) => {
      try {
        const valueToStore = typeof value === "function" ? value(state) : value;
        setState(valueToStore);

        // Handle File object conversion to base64
        if (typeof valueToStore === "object" && valueToStore.profileImage instanceof File) {
          const reader = new FileReader();
          reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            const fileData = {
              ...valueToStore,
              profileImage: {
                data: base64String,
                type: valueToStore.profileImage.type,
                name: valueToStore.profileImage.name
              }
            };
            localStorage.setItem(key, JSON.stringify(fileData));
          };
          reader.readAsDataURL(valueToStore.profileImage);
        } else {
          localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error saving to localStorage for key "${key}":`, error);
      }
    };
  
    return [state, setValue];
  }