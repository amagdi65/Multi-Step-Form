import React from "react";

const ProgresBar = ({ steps, currentStep }) => {
  const getStepClasses = (stepId) => {
    if (currentStep === stepId) {
      return "bg-indigo-600 border-indigo-600 text-white";
    } else if (currentStep > stepId) {
      return "bg-yellow-400 border-yellow-400 text-white";
    } else {
      return "bg-gray-400 border-gray-400 text-white";
    }
  };

  return (
    <div className="w-fullflex md:justify-center mt-4 w-full">
      <ul className="flex items-center space-x-6 p-4 w-max m-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <li className="flex items-center space-x-2">
              <span
                className={`flex items-center justify-center w-8 h-8 text-sm font-semibold rounded-full border-2 ${getStepClasses(
                  step.id
                )}`}
              >
                {currentStep > step.id ? "✔" : step.id}
              </span>
              <span
                className={`whitespace-nowrap ${
                  currentStep === step.id
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-600"
                }`}
              >
                {step.label}
              </span>
            </li>

            {index < steps.length - 1 && (
              <div className="w-16 h-1 bg-gray-300"></div>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(ProgresBar);
