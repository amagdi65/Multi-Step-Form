import React, { useContext, useEffect,createRef } from "react";
import { FormContext } from "../FormContext";
import { validateField } from "../utils/validation";

const Field = ({ type, name, id, classNames, validation, placeholder }) => {
  const { formData, setFormData, error, setError } = useContext(FormContext);
  const inputRef = createRef();
  useEffect(() => {
    const validationMessage = validateField(inputRef?.current?.value, validation);
    if (validationMessage && inputRef?.current?.value ) {
      setError(validationMessage);
    } 
  }, [inputRef, setError, validation]);
  const handleChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const validationMessage = validateField(value, validation);
    if (validationMessage) {
      setError(validationMessage);
    } else {
        setError("");
    }
  };
  return (
    <div className={`mb-4 ${error ? "text-red-600" : ""}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {placeholder}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${classNames} ${
          error ? "border-red-500" : ""
        }`}
        value={formData[name] || ""}
        onChange={handleChange}
        onBlur={() => validateField(formData[name] || "", validation)}
        placeholder={placeholder}
        ref={inputRef}
      />
    </div>
  );
};

export default Field;
