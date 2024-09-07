import { Grid } from "@mui/material";
import React from "react";
import RenderInput from "../../../components/RenderInput/RenderInput";
import { useSwitchTableForm } from "../../../hooks/batch/Batch/useSwitchTableForm";

const inputField = [
  {
    id: 1,
    name: "targetTableId",
    label: "Target Table",
    placeholder: "Select target table",
    type: "text",
    required: true,
    xs: 12,
    md: 12,
    lg: 12,
    sm: 12,
  },
];
const SwitchTableForm = () => {
  const { formik, loading } = useSwitchTableForm();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RenderInput inputField={inputField} formik={formik} />
      </Grid>
    </Grid>
  );
};

export default SwitchTableForm;
