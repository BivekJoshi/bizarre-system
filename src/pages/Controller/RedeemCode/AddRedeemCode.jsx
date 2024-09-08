import React from "react";
import RenderInput from "../../../components/RenderInput/RenderInput";
import { nanoid } from "nanoid";

const AddRedeemCode = ({ formik }) => {
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
      name: "league",
      label: "League",
      type: "dropDown",
      required: true,
      options: [
        { value: "BRONZE", label: "Bronze", id: nanoid() },
        { value: "SILVER", label: "Silver", id: nanoid() },
        { value: "GOLD", label: "Gold", id: nanoid() },
        { value: "PLATINUM", label: "Platinum", id: nanoid() },
      ],
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "redeemableCoins",
      label: "Redeemable Coins",
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

export default AddRedeemCode;
