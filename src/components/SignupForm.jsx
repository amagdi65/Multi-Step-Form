import React, { useContext, useMemo } from "react";
import ProgresBar from "./ProgresBar";
import CountrySelection from "./CountrySelection";
import DynamicStep from "./DynamicStep";
import Field from "./Field";
import { formConfig } from "../formConfig";
import ImageUpload from "./ImageUpload";
import ReviewStep from "./ReviewStep";
import { FormContext } from "../FormContext";

const SignupForm = () => {
  const { formData, currentStep } = useContext(FormContext);
  const { country } = formData;

  const steps = useMemo(() => {
    const stepsArray = [
      {
        id: 1,
        label: "Country Selection",
        component: (
          <DynamicStep
            label="Country Selection"
            stepsLength={0}
            fieldName={"country"}
          >
            <CountrySelection />
          </DynamicStep>
        ),
      },
    ];

    if (country && formConfig[country]) {
      const dynamicSteps = formConfig[country].map((field, index) => ({
        id: stepsArray.length + index + 1,
        label: field.label,
        component: (
          <DynamicStep
            label={field.label}
            stepsLength={stepsArray.length}
            validation={field.validation}
            fieldName={field.name}
          >
            <Field
              type="text"
              id={field.name}
              name={field.name}
              classNames="w-full p-2 bg-gray-50 rounded-md border-2 border-gray-200 mb-4 mt-4"
              validation={field.validation}
              placeholder={field.placeholder}
            />
          </DynamicStep>
        ),
      }));

      stepsArray.push(...dynamicSteps);
    }

    stepsArray.push({
      id: stepsArray.length + 1,
      label: "Image Upload",
      component: (
        <DynamicStep
          label="Image Upload"
          stepsLength={stepsArray.length}
          fieldName={"profileImage"}
        >
          <ImageUpload />
        </DynamicStep>
      ),
    });

    stepsArray.push({
      id: stepsArray.length + 1,
      label: "Review",
      component: (
        <DynamicStep label="Review" stepsLength={stepsArray.length + 1}>
          <ReviewStep />
        </DynamicStep>
      ),
    });

    return stepsArray;
  }, [country]);

  return (
    <>
      <div className="flexujustify-center items-center m-auto overflow-x-auto">
        <ProgresBar steps={steps} currentStep={currentStep} />
      </div>
      <div className="m-8 h-2/3">{steps[currentStep - 1]?.component}</div>
    </>
  );
};

export default SignupForm;
