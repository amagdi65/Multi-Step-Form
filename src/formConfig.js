export const formConfig = {
  USA: [
    {
      name: "ssn",
      label: "Social Security Number",
      type: "text",
      placeholder: "XXX-XX-XXXX",
      validation: {
        required: "SSN is required",
        pattern: {
          value: /^\d{3}-\d{2}-\d{4}$/,
          message: "SSN must be in the format XXX-XX-XXXX",
        },
      },
    },
    {
      name: "state",
      label: "State",
      type: "text",
      placeholder: "e.g., CA",
      validation: {
        required: "State is required",
        maxLength: {
          value: 2,
          message: "State abbreviation must be 2 letters",
        },
      },
    },
    {
      name: "zip",
      label: "Zip Code",
      type: "text",
      placeholder: "e.g., 12345 or 12345-6789",
      validation: {
        required: "Zip Code is required",
        pattern: {
          value: /^\d{5}(-\d{4})?$/,
          message:
            "Zip Code must be 5 digits, optionally followed by a 4-digit extension",
        },
      },
    },
  ],
  UAE: [
    {
      name: "emiratesId",
      label: "Emirates ID",
      type: "text",
      placeholder: "XXX-XXXX-XXXXXXX-X",
      validation: {
        required: "Emirates ID is required",
        pattern: {
          value: /^\d{3}-\d{4}-\d{7}-\d{1}$/,
          message: "Emirates ID must be in the format XXX-XXXX-XXXXXXX-X",
        },
      },
    },
    {
      name: "visaType",
      label: "Visa Type",
      type: "text",
      placeholder: "e.g., Work, Tourist",
      validation: {
        required: "Visa Type is required",
      },
    },
    {
      name: "city",
      label: "City",
      type: "text",
      placeholder: "e.g., Dubai",
      validation: {
        required: "City is required",
      },
    },
  ],
  India: [
    {
      name: "aadhaar",
      label: "Aadhaar Number",
      type: "text",
      placeholder: "XXXX XXXX XXXX",
      validation: {
        required: "Aadhaar Number is required",
        pattern: {
          value: /^\d{4}\s\d{4}\s\d{4}$/,
          message: "Aadhaar Number must be in the format XXXX XXXX XXXX",
        },
      },
    },
    {
      name: "state",
      label: "State",
      type: "text",
      placeholder: "e.g., Maharashtra",
      validation: {
        required: "State is required",
      },
    },
    {
      name: "pin",
      label: "PIN Code",
      type: "text",
      placeholder: "e.g., 400001",
      validation: {
        required: "PIN Code is required",
        pattern: {
          value: /^\d{6}$/,
          message: "PIN Code must be 6 digits",
        },
      },
    },
  ],
  Germany: [
    {
      name: "taxId",
      label: "Tax ID",
      type: "text",
      placeholder: "11-digit number",
      validation: {
        required: "Tax ID is required",
        pattern: {
          value: /^\d{11}$/,
          message: "Tax ID must be 11 digits",
        },
      },
    },
    {
      name: "bundesland",
      label: "Bundesland",
      type: "text",
      placeholder: "e.g., Bayern",
      validation: {
        required: "Bundesland is required",
      },
    },
    {
      name: "postalCode",
      label: "Postal Code",
      type: "text",
      placeholder: "e.g., 12345",
      validation: {
        required: "Postal Code is required",
        pattern: {
          value: /^\d{5}$/,
          message: "Postal Code must be 5 digits",
        },
      },
    },
  ],
  Canada: [
    {
      name: "sin",
      label: "SIN",
      type: "text",
      placeholder: "XXX-XXX-XXX",
      validation: {
        required: "SIN is required",
        pattern: {
          value: /^\d{3}-\d{3}-\d{3}$/,
          message: "SIN must be in the format XXX-XXX-XXX",
        },
      },
    },
    {
      name: "province",
      label: "Province",
      type: "text",
      placeholder: "e.g., Ontario",
      validation: {
        required: "Province is required",
      }
    },
    {
      name: "postalCode",
      label: "Postal Code",
      type: "text",
      placeholder: "A1A 1A1",
      validation: {
        required: "Postal Code is required",
        pattern: {
          value: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
          message: "Postal Code must be in the format A1A 1A1",
        },
      },
    },
  ],
};
