export const validateImage = (file) => {
  if (file.size > 1024 * 1024) {
    return "File is too large (max 1MB)";
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width > 600 || img.height > 600) {
        reject("Image dimensions exceed 600x600 pixels");
      } else {
        resolve(img.src);
      }
    };
  });
};

export const validateField = (value, validation) => {
  if (validation?.required && !value) {
    return validation.required;
  }

  if (validation?.pattern && !validation.pattern.value.test(value)) {
    return validation.pattern.message;
  }

  if (validation?.maxLength && value.length > validation.maxLength.value) {
    return validation.maxLength.message;
  }
  return "";
};

export const validateCountry = (value) => {
  if (value === "") {
    return "Please select a country";
  }
  return "";
};
