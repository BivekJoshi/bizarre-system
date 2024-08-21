import React from "react";
import { nanoid } from "nanoid";
import RenderInput from "../../../components/RenderInput/RenderInput";

const CustomerTableForm = ({ formik }) => {
  const inputField = [
    {
      id: nanoid(),
      name: "tableNumber",
      label: "tableNumber",
      type: "text",
      required: true,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "status",
      label: "Status",
      type: "dropDown",
      required: true,
      options: [
        { value: "RESERVED", label: "RESERVED", id: nanoid() },
        { value: "AVAILABLE", label: "AVAILABLE", id: nanoid() },
        { value: "OCCUPIED", label: "OCCUPIED", id: nanoid() },
        { value: "OUT_OF_ORDER", label: "OUT_OF_ORDER", id: nanoid() },
      ],
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
  ];
  return <RenderInput inputField={inputField} formik={formik} />;
};

export default CustomerTableForm;
