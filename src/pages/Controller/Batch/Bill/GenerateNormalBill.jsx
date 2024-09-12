import React from "react";
import { nanoid } from "nanoid";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { Button, Grid, Stack } from "@mui/material";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import { useGenerateNormalBillForm } from "../../../../hooks/batch/Batch/useGenerateNormalBillForm";
import { LoadingButton } from "@mui/lab";

const GenerateNormalBill = ({batchId}) => {
  const { formik, loading } = useGenerateNormalBillForm({batchId});

  const inputField = [
    {
      id: nanoid(),
      name: "billingName",
      label: "Billing Name",
      placeholder: "Enter mobile number",
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
      placeholder: "Enter mobile number",
      type: "text",
      required: true,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RenderInput formik={formik} inputField={inputField} />
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="end" spacing={2}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              formik.handleReset();
              onClose();
            }}
            startIcon={<HighlightOffRoundedIcon />}
          >
            Close
          </Button>
          <LoadingButton
            loading={loading}
            onClick={() => formik.handleSubmit()}
            variant={"outlined"}
            Width={"-webkit-fill-available"}
            startIcon={<ControlPointRoundedIcon />}
          >
            Generate Normal Bill
          </LoadingButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default GenerateNormalBill;
