import React from "react";
import { nanoid } from "nanoid";
import RenderInput from "../../../components/RenderInput/RenderInput";

const CustomerUnboardForm = ({ formik }) => {
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
      md: 12,
      lg: 12,
      sm: 12,
    }
  ];
  return <RenderInput inputField={inputField} formik={formik} />;
};

export default CustomerUnboardForm;
