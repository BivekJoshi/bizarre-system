import React from "react";
import RenderInput from "../../../components/RenderInput/RenderInput";
import { nanoid } from "nanoid";

const AddBranch = ({ formik }) => {
  const inputField = [
    {
      id: nanoid(),
      name: "address",
      label: "Address",
      type: "text",
      required: true,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "phoneNumber",
      label: "Phone Number",
      type: "number",
      required: true,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "housingCapacity",
      label: "Housing Capacity",
      type: "number",
      required: true,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
  ];
  return <RenderInput inputField={inputField} formik={formik} />;
};

export default AddBranch;
