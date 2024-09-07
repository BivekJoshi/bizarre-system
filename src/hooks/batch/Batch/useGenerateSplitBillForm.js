import { useFormik } from "formik";
import { useState } from "react";
import { useGenerateSplitBillBatch } from "../usebatch";

export const useGenerateSplitBillForm = () => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useGenerateSplitBillBatch({});

  const formik = useFormik({
    initialValues: {
      batchId: "",
      mobileNumbers: [],
      promoCode: "",
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
