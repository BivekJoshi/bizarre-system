import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Grid, Stack, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FieldArray, FormikProvider } from "formik";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import { useGenerateSplitBillForm } from "../../../../hooks/batch/Batch/useGenerateSplitBillForm";
import FormModal from "../../../../components/Modal/FormModal";
import BillLayout from "../Payment/BillLayout";
import { useGetCustomerByMobileNumber } from "../../../../hooks/customer/useCustomer";
import SplitBillPrint from "./SplitBillPrint";

const MobileNumberInput = ({ index, mobileNumber, formik, arrayHelpers }) => {
  const { data: customerDetail } = useGetCustomerByMobileNumber(mobileNumber);

  return (
    <div>
      <RenderInput
        formik={formik}
        inputField={[
          {
            id: nanoid(),
            name: `mobileNumbers[${index}]`,
            label: `Mobile Number ${index + 1}`,
            placeholder: "Enter number",
            type: "number",
            required: true,
            xs: 12,
            md: 12,
            lg: 12,
            sm: 12,
          },
          {
            id: nanoid(),
            type: "showData",
            userData: customerDetail?.data?.user,
            otherData: customerDetail?.data,
            xs: 12,
            md: 12,
            lg: 12,
            sm: 12,
          },
        ]}
      />
      <Button
        onClick={() => arrayHelpers.remove(index)}
        color="error"
        disabled={formik.values.mobileNumbers.length === 1}
      >
        Remove
      </Button>
    </div>
  );
};

const GenerateSplitBill = ({ batchId, onClose }) => {
  console.log("🚀 ~ GenerateSplitBill ~ batchId:", batchId)
  const [finalBillModalOpen, setFinalBillModalOpen] = useState(false);
  const [finalBill, setFinalBill] = useState(null);

  const { formik, loading } = useGenerateSplitBillForm({
    batchId,
    finalBill: (data) => {
      setFinalBill(data);
      setFinalBillModalOpen(true);
    },
  });

  return (
    <>
      <FormikProvider value={formik}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RenderInput
              formik={formik}
              inputField={[
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
                  name: "promoCode",
                  label: "Promo Code",
                  placeholder: "Enter promo code",
                  type: "text",
                  // required: true,
                  xs: 12,
                  md: 12,
                  lg: 12,
                  sm: 12,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12}>
            <FieldArray
              name="mobileNumbers"
              render={(arrayHelpers) => (
                <>
                  {formik.values.mobileNumbers.map((mobileNumber, index) => (
                    <MobileNumberInput
                      key={index}
                      index={index}
                      mobileNumber={mobileNumber}
                      formik={formik}
                      arrayHelpers={arrayHelpers}
                    />
                  ))}
                  <Button
                    onClick={() => arrayHelpers.push("")}
                    variant="contained"
                  >
                    Add Mobile Number
                  </Button>
                </>
              )}
            />
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
                variant="outlined"
                startIcon={<ControlPointRoundedIcon />}
              >
                Generate Split Bill
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormikProvider>

      <FormModal
        open={finalBillModalOpen}
        onClose={() => setFinalBillModalOpen(false)}
        width={"25%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Bill Layout"}
        formComponent={
          <>
            {/* <BillLayout
              finalBill={finalBill}
              onClose={() => {
                setFinalBillModalOpen(false);
                onClose();
              }}
            /> */}
            <SplitBillPrint
              finalBill={finalBill}
              onClose={() => {
                setFinalBillModalOpen(false);
                onClose();
              }}
            />
          </>
        }
        showButton={false}
      />
    </>
  );
};

export default GenerateSplitBill;
