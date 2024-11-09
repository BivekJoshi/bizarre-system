import React from "react";
import { nanoid } from "nanoid";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { Button, Grid, Stack } from "@mui/material";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import { LoadingButton } from "@mui/lab";
import { useSplitPayForm } from "../../../../hooks/batch/Batch/useSplitPayForm";
import { useNormalPayForm } from "../../../../hooks/batch/Batch/useNormalPayForm";

const Normalpay = ({ batchStatus, batchId, onClose }) => {
  const { formik, loading } =
    batchStatus === "SPLIT"
      ? useSplitPayForm({ batchId, onClose })
      : useNormalPayForm({ batchId, onClose });

  const inputField = [
    {
      id: nanoid(),
      name: "cashReceived",
      label: "Cash Received",
      placeholder: "Enter cash received",
      type: "text",
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
            width={"-webkit-fill-available"}
            startIcon={<ControlPointRoundedIcon />}
          >
            Make Payment
          </LoadingButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Normalpay;
