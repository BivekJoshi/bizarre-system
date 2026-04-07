import { useFormik } from "formik";
import { useState } from "react";
import { useByPassPaymentBatch } from "../usebatch";
import * as Yup from "yup";

export const useByPassPaymentBatchForm = ({ batchId }) => {
  const { mutate,isLoading } = useByPassPaymentBatch({});

  const validationSchema = Yup.object({
    mobileNumber: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      batchId: batchId || "",
      mobileNumber: "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handledAddRequest(values);
    },
  });

  const handledAddRequest = (values) => {
    values = { ...values };
    mutate(values, {
      onSuccess: () => {
      },
    });
  };

  return {
    formik,
    loading:isLoading,
  };
};
