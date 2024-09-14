import { Button, Grid } from "@mui/material";
import React from "react";
import RenderInput from "../../../components/RenderInput/RenderInput";
import { useSwitchTableForm } from "../../../hooks/batch/Batch/useSwitchTableForm";
import { nanoid } from "nanoid";
import { useGetCustomerTableByStatus } from "../../../hooks/customerTable/useCustomerTable";
import { LoadingButton } from "@mui/lab";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';

const SwitchTableForm = ({ onClose, tableId }) => {
  const { formik, loading } = useSwitchTableForm({ onClose, tableId });

  const { data: availableTableData } = useGetCustomerTableByStatus("AVAILABLE");

  const matchedOptions = Array.isArray(availableTableData)
    ? availableTableData?.map((value, index) => ({
        id: index + 1,
        value: value?.id,
        label: `Table Number ${value?.tableNumber}`,
      }))
    : [];

  const inputField = [
    {
      id: nanoid(),
      name: "targetTableId",
      label: "Select target table",
      type: "dropDown",
      options: matchedOptions,
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
        <RenderInput inputField={inputField} formik={formik} />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          alignItems: "center",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
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
          startIcon={<ChangeCircleRoundedIcon />}
        >
          Change Table
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default SwitchTableForm;
