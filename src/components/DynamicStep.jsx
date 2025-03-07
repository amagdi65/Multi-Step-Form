import React, { useContext, useState } from "react";
import Button from "./Button";
import { FormContext } from "../FormContext";

const DynamicStep = ({ stepsLength, children, label, fieldName }) => {
  const { currentStep, setCurrentStep, error, setError } =
    useContext(FormContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isLastStep = currentStep === stepsLength;
  function handleSubmit(e) {
    e.preventDefault();
    const formElements = e.target.elements;
    if (formElements[fieldName]?.type === "file") {
      if (!document.getElementById("profile-image")) {
        setError("This field is required.");
        return;
      }
    } else {
      const myFieldValue = formElements[fieldName]?.value;
      if (fieldName && !myFieldValue) {
        setError("This field is required.");
        return;
      }
    }
    if (error) {
      return;
    }
    if (isLastStep) {
      setShowConfirmation(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  }

  function handleConfirmSubmit() {
    alert("Form submitted successfully!");
    setShowConfirmation(false);
  }

  function handleCancel() {
    setShowConfirmation(false);
  }

  const goBack = () => {
    if (currentStep === 1) return;
    setError("");
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <form
        className="bg-white rounded-lg shadow-md p-8"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-neutral-950 text-2xl md:text-3xl mb-6 text-center">
          {label}
        </h2>

        <div className="mb-8">{children}</div>
        {error && (
          <div className="text-red-500 text-sm font-medium px-3 py-2 bg-red-50 rounded-md">
            {error}
          </div>
        )}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <Button
              type="button"
              name="Back"
              classNames={`px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              ${
                currentStep === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-600 hover:bg-gray-700 text-white"
              }`}
              onClick={goBack}
              disabled={currentStep === 0}
            />
          )}

          <Button
            type="submit"
            name={isLastStep ? "Submit" : "Next"}
            classNames="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
        </div>
      </form>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="text-center mb-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mb-4">
                <svg
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Confirm Submission
              </h3>
              <p className="text-gray-500 mt-2">
                Are you sure you want to submit this form? This action cannot be
                undone.
              </p>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleConfirmSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicStep;
