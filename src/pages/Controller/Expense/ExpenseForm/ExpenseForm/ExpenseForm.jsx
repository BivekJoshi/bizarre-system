import React from "react";
import { nanoid } from "nanoid";
import RenderInput from "../../../../../components/RenderInput/RenderInput";

const ExpenseForm = ({ formik }) => {
  const inputField = [
    {
      id: nanoid(),
      name: "expenseType",
      label: "Expense Type",
      type: "dropDown",
      required: true,
      options: [
        { value: "DIRECT_OPERATING", label: "Direct Operating", id: nanoid() },
        {
          value: "INDIRECT_OPERATING",
          label: "Indirect Operating",
          id: nanoid(),
        },
        { value: "ADMINISTRATIVE", label: "Administrative", id: nanoid() },
        {
          value: "SELLING_DISTRIBUTION",
          label: "Selling Distribution",
          id: nanoid(),
        },
        { value: "FINANCIAL", label: "Financial", id: nanoid() },
        {
          value: "DEPRECIATION_AMORTIZATION",
          label: "Depreciation Amortization",
          id: nanoid(),
        },
        { value: "MISCELLANEOUS", label: "Miscellaneous", id: nanoid() },
      ],
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "paymentType",
      label: "Payment Type",
      type: "dropDown",
      required: true,
      options: [
        { value: "CASH", label: "Cash", id: nanoid() },
        { value: "BANK", label: "Bank", id: nanoid() },
        { value: "LOSS", label: "Loss", id: nanoid() },
      ],
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "amount",
      label: "Amount",
      type: "text",
      required: true,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "description",
      label: "Description",
      type: "text",
      required: true,
      multiline: true,
      rows: 3,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
  ];
  return <RenderInput inputField={inputField} formik={formik} />;
};

export default ExpenseForm;
