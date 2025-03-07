import React, { useContext } from "react";
import { FormContext } from "../FormContext";
import { formConfig } from "../formConfig";

const ReviewStep = () => {
  const { formData } = useContext(FormContext);

  const { profileImage } = formData;

  const formatFieldName = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const formatValue = (key, value) => {
    if (value === null || value === undefined) return "Not provided";
    if (key === "profileImage" && value instanceof File) return value.name;
    if (value && value.name) return value.name;
    if (typeof value === "boolean") return value ? "Yes" : "No";
    return value.toString();
  };

  const imagePreviewUrl =
    profileImage instanceof File ? URL.createObjectURL(profileImage) : null;

  return (
    <div className="flex flex-col md:flex-row w-full gap-6">
      {imagePreviewUrl && (
        <div className="flex flex-col items-center border rounded-lg p-4 bg-gray-50 w-full md:w-1/3 lg:w-1/4">
          <h4 className="text-md font-medium text-gray-700 mb-3">
            Profile Image
          </h4>
          <div className="w-32 h-32 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <img
              src={imagePreviewUrl}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center truncate max-w-full">
            {profileImage instanceof File ? profileImage.name : ""}
          </p>
        </div>
      )}

      <div className="border rounded-lg divide-y w-full md:w-2/3 lg:w-3/4">
        {Object.entries(formData)
          .filter(([key]) => {
            return (
              key !== "profileImage" &&
              formConfig[formData.country].find((field) => field.name === key)
            );
          })
          .map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col sm:flex-row sm:items-center p-4 hover:bg-gray-50"
            >
              <div className="w-full sm:w-1/3 font-medium text-gray-500 mb-1 sm:mb-0">
                {formatFieldName(key)}
              </div>
              <div className="w-full sm:w-2/3 text-gray-800 break-words">
                {formatValue(key, value)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReviewStep;
