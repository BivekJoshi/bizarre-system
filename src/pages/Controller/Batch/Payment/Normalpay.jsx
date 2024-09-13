import React from "react";
import { nanoid } from "nanoid";
import { useGetBatchOrder } from "../../../../hooks/order/useOrder";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useNormalPayForm } from "../../../../hooks/batch/Batch/useNormalPayForm";
import { Button, Grid, Stack } from "@mui/material";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import { LoadingButton } from "@mui/lab";

const Normalpay = ({ batchId }) => {
  const { formik, loading } = useNormalPayForm({ batchId });


  const inputField = [
    {
      id: nanoid(),
      name: "cashReceived",
      label: "Cash Received",
      placeholder: "Enter cash received",
      type: "text",
      required: true,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "bankReceived",
      label: "Bank Received",
      placeholder: "Enter bank received",
      type: "text",
      required: true,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "coinsReceived",
      label: "Coins Received",
      placeholder: "Enter coins received",
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
            Normal Pay
          </LoadingButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Normalpay;
