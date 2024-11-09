import React, { useState } from "react";
import { nanoid } from "nanoid";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { Button, Grid, Stack } from "@mui/material";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import { useGenerateNormalBillForm } from "../../../../hooks/batch/Batch/useGenerateNormalBillForm";
import { LoadingButton } from "@mui/lab";
import FormModal from "../../../../components/Modal/FormModal";
import BillLayout from "../Payment/BillLayout";
import {  useGetCustomerByMobileNumber } from "../../../../hooks/customer/useCustomer";

const GenerateNormalBill = ({ batchId, onClose }) => {
  const [finalBillModalOpen, setFinalBillModalOpen] = useState(false);
  const [finalBill, setFinalBill] = useState(null);

  const { formik, loading } = useGenerateNormalBillForm({
    batchId,
    finalBill: (data) => {
      setFinalBill(data);
      setFinalBillModalOpen(true);
    },
  });

  const mobileNumber = formik.values.mobileNumber || '';

  const { data: customerDetail } = useGetCustomerByMobileNumber(mobileNumber);

  const inputField = [
    {
      id: nanoid(),
      name: "billingName",
      label: "Billing Name",
      placeholder: "Enter billing name",
      type: "text",
      // required: true,
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
      type: "number",
      // required: true,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
    {
      id: nanoid(),
      type: "showData",
      data1: customerDetail?.data?.user?.fullName,
      data2: customerDetail?.data?.user?.email,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
  ];

  return (
    <>
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
              // disabled={!customerDetail}
            >
              Generate Normal Bill
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>

      <FormModal
        open={finalBillModalOpen}
        onClose={() => setFinalBillModalOpen(false)}
        width={"25%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Bill Layout"}
        formComponent={
          <>
            <BillLayout
              finalBill={finalBill}
              onClose={() => {
                setFinalBillModalOpen(false); 
                onClose()
              }}
            />
          </>
        }
        showButton={false}
      />
    </>
  );
};

export default GenerateNormalBill;
