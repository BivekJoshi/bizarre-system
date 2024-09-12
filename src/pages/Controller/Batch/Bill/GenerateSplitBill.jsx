import React from "react";
import { nanoid } from "nanoid";
import { Grid, Stack, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FieldArray, FormikProvider } from "formik";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import { useGenerateSplitBillForm } from "../../../../hooks/batch/Batch/useGenerateSplitBillForm";

const GenerateSplitBill = ({ batchId, onClose }) => {
  const { formik, loading } = useGenerateSplitBillForm({ batchId });

  return (
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
                name: "promoCode",
                label: "Promo Code",
                placeholder: "Enter promo code",
                type: "text",
                required: true,
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
                {formik.values.mobileNumbers.map((_, index) => (
                  <div key={index}>
                    <RenderInput
                      formik={formik}
                      inputField={[
                        {
                          id: nanoid(),
                          name: `mobileNumbers[${index}]`,
                          label: "Mobile Number",
                          placeholder: "Enter number code",
                          type: "number",
                          required: true,
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
              onClick={formik.handleSubmit}
              variant="outlined"
              startIcon={<ControlPointRoundedIcon />}
            >
              Generate Split Bill
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormikProvider>
  );
};

export default GenerateSplitBill;
