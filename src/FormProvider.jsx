import React from "react";
import { FormContext } from "./FormContext";
import { usePersistentState } from "./hooks/usePersistentState";

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = usePersistentState("formData", {});
  const [currentStep, setCurrentStep] = usePersistentState("currentStep", 1);
  const [error, setError] = usePersistentState("formError", "");

  return (
    <FormContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        formData,
        setFormData,
        error,
        setError,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
