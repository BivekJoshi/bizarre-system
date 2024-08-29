import React from "react";
import { nanoid } from "nanoid";
import RenderInput from "../../../components/RenderInput/RenderInput";

const AddSetting = ({ formik }) => {
  const inputField = [
    {
      id: nanoid(),
      name: "value",
      label: "Value",
      type: "text",
      required: true,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "setting",
      label: "Setting",
      type: "dropDown",
      required: true,
      options: [
        { value: "REDEEMABLE_COINS_PERCENTAGE", label: "Redeemable Coins Percentage", id: nanoid() },
        { value: "SILVER_LEAGUE_THRESHOLD", label: "Silver League Threshold", id: nanoid() },
        { value: "GOLD_LEAGUE_THRESHOLD", label: "Gold League Threshold", id: nanoid() },
        { value: "PLATINUM_LEAGUE_THRESHOLD", label: "Platinium League Threshold", id: nanoid() },
      ],
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
  ];
  return <RenderInput inputField={inputField} formik={formik} />;
};

export default AddSetting;
