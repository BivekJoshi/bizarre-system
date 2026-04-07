import { useFormik } from "formik";
import { useState } from "react";
import { useGenerateNormalBillBatch } from "../usebatch";

export const useGenerateNormalBillForm = ({ batchId, finalBill }) => {
  const { mutate ,isLoading} = useGenerateNormalBillBatch({});

  const formik = useFormik({
    initialValues: {
      batchId: batchId || "",
      billingName: "",
      mobileNumber: "",
      promoCode: "",
    },
    // validationSchema: userSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handledAddRequest(values);
    },
  });

  const handledAddRequest = (values) => {
    values = { ...values };
    mutate(values, {
      onSuccess: (data) => {
        finalBill(data?.data?.data);
      },
    });
  };

  return {
    formik,
    loading:isLoading,
  };
};
