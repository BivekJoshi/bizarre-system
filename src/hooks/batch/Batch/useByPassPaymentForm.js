import { useFormik } from "formik";
import { useState } from "react";
import { useByPassPaymentBatch } from "../usebatch";
import * as Yup from "yup";

export const useByPassPaymentBatchForm = ({ batchId }) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useByPassPaymentBatch({});

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
    setLoading(true);
    values = { ...values };
    mutate(values, {
      onSuccess: () => {
        setLoading(false);
      },
    });
  };

  return {
    formik,
    loading,
  };
};
