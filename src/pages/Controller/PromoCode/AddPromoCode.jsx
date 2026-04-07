import React from "react";
import RenderInput from "../../../components/RenderInput/RenderInput";
import { nanoid } from "nanoid";

const AddPromoCode = ({ formik }) => {
  const inputField = [
    {
      id: nanoid(),
      name: "code",
      label: "Code",
      type: "text",
      required: true,
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "userType",
      label: "User Type",
      type: "dropDown",
      required: true,
      options: [
        { value: "ADMIN", label: "Admin", id: nanoid() },
        { value: "BRANCH_OWNER", label: "Branch Owner", id: nanoid() },
        { value: "CASHIER", label: "Cashier", id: nanoid() },
        { value: "WAITER", label: "Waiter", id: nanoid() },
        { value: "BARISTA", label: "Barista", id: nanoid() },
        { value: "SUPPLIER", label: "Supplier", id: nanoid() },
        { value: "CUSTOMER", label: "Customer", id: nanoid() },
      ],
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "discountType",
      label: "Discount Type",
      type: "dropDown",
      required: true,
      options: [
        { value: "PERCENTAGE", label: "Percentage", id: nanoid() },
        { value: "AMOUNT", label: "Amount", id: nanoid() },
      ],

      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "discountValue",
      label: "Discount Value",
      type: "number",
      required: true,
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "effectiveDateTime",
      label: "Effective Date Time",
      type: "datetime",
      required: true,
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "terminationDateTime",
      label: "Termination Date Time",
      type: "datetime",
      required: true,
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
  ];
  return <RenderInput inputField={inputField} formik={formik} />;
};

export default AddPromoCode;
