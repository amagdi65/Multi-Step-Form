import React, { useState, useRef, useEffect, useContext } from "react";
import { FormContext } from "../FormContext";
import { validateImage } from "../utils/validation";

const ImageUpload = () => {
  const { formData, setFormData,setError } = useContext(FormContext);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (formData.profileImage instanceof File) {
      const url = URL.createObjectURL(formData.profileImage);
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [formData.profileImage]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const img = await validateImage(file);
      setPreview(img);
      setFormData({ ...formData, profileImage: file });
      setError("");
    } catch (err) {
      setError(err);
      setPreview(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    try {
      const img = await validateImage(file);
      setPreview(img);
      setFormData({ ...formData, profileImage: file });
      setError("");
    } catch (err) {
      setError(err);
      setPreview(null);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setPreview(null);
    setFormData({ ...formData, profileImage: null });
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => fileInputRef.current.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
          name="profileImage"
        />

        {preview ? (
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg mb-4"
                id="profile-image"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Remove image"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-500">Click or drag to replace</p>
          </div>
        ) : (
          <>
            <svg
              className="w-12 h-12 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-700">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, GIF (Max 1MB, 600x600px)
            </p>
          </>
        )}
      </div>

    
    </div>
  );
};

export default ImageUpload;
