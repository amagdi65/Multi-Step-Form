import React, { useContext, useEffect ,createRef} from "react";
import { FormContext } from "../FormContext";
import { validateCountry } from "../utils/validation";

const CountrySelection = () => {
  const { formData, setFormData, setError, error } = useContext(FormContext);
  const inputRef = createRef();
   useEffect(() => {
      const validationMessage = validateCountry(inputRef?.current?.value);
      if (validationMessage) {
        setError(validationMessage);
      } 
    }, [error, inputRef, setError]);
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, country: e.target.value }));
    const validationMessage = validateCountry(e.target.value);
    if (validationMessage) {
      setError(validationMessage);
    } else {
      setError("");
    }
  }
  return (
    <>
      <select
        id="country"
        name="country"
        className={
          "w-full p-2 bg-gray-50 rounded-md border-2 border-gray-200 mb-4 mt-4" +
          (error ? " border-red-500" : "")
        }
        value={formData["country"]}
        onChange={(e) => handleChange(e)}
        onBlur={() => {
          const validationMessage = validateCountry(formData["country"]);
          if (validationMessage) {
            setError(validationMessage);
          }
        }}
        ref={inputRef}
      >
        <option value="">--Select--</option>
        <option value="USA">🇺🇸 USA</option>
        <option value="UAE">🇦🇪 UAE</option>
        <option value="India">🇮🇳 India</option>
        <option value="Germany">🇩🇪 Germany</option>
        <option value="Canada">🇨🇦 Canada</option>
      </select>
    </>
  );
};

export default CountrySelection;
