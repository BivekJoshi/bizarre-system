import React from "react";
import { nanoid } from "nanoid";
import RenderInput from "../../../components/RenderInput/RenderInput";

const CustomerTableForm = ({ formik }) => {
  const inputField = [
    {
      id: nanoid(),
      name: "tableNumber",
      label: "Table Number",
      type: "text",
      required: true,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
    // {
    //   id: nanoid(),
    //   name: "status",
    //   label: "Status",
    //   type: "dropDown",
    //   required: true,
    //   options: [
    //     { value: "RESERVED", label: "Reserved", id: nanoid() },
    //     { value: "AVAILABLE", label: "Available", id: nanoid() },
    //     { value: "OCCUPIED", label: "Occupied", id: nanoid() },
    //     { value: "OUT_OF_ORDER", label: "Out of Order", id: nanoid() },
    //   ],
    //   xs: 12,
    //   md: 12,
    //   lg: 12,
    //   sm: 12,
    // },
  ];
  return <RenderInput inputField={inputField} formik={formik} />;
};

export default CustomerTableForm;
