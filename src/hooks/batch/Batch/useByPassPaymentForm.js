import { useFormik } from "formik";
import { useState } from "react";
import { useByPassPaymentBatch } from "../usebatch";

export const useByPassPaymentBatchForm = () => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useByPassPaymentBatch({});

  const formik = useFormik({
    initialValues: {
      batchId: "",
      mobileNumber: "",
    },
    // validationSchema: userSchema,
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
