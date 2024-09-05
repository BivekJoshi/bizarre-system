import React from "react";
import { nanoid } from "nanoid";
import RenderInput from "../../../../components/RenderInput/RenderInput";

const BaristaForm = ({ formik }) => {
  const inputField = [
    {
      id: nanoid(),
      name: "fullName",
      label: "Full Name",
      type: "text",
      required: true,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "mobileNumber",
      label: "Mobile Number",
      type: "number",
      required: true,
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "gender",
      label: "Gender",
      type: "dropDown",
      required: true,
      options: [
        { value: "FEMALE", label: "Female", id: nanoid() },
        { value: "MALE", label: "Male", id: nanoid() },
        { value: "OTHERS", label: "Others", id: nanoid() },
      ],
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },

    {
      id: nanoid(),
      name: "birthDate",
      label: "Date of Birth",
      type: "date",
      required: true,
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "address",
      label: "Address",
      type: "text",
      required: true,
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "email",
      label: "Email",
      type: "text",
      required: true,
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      responseId: "id",
      name: "branchId",
      label: "Branch",
      path: "/branch/find",
      type: "asyncDropDown",
      required: true,
      responseLabel: "address",
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },

    {
      id: nanoid(),
      name: "salary",
      label: "Salary",
      type: "text",
      required: true,
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
  ];
  return <RenderInput inputField={inputField} formik={formik} />;
};

export default BaristaForm;
