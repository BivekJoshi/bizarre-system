import { useFormik } from "formik";
import { useState } from "react";
import { useGenerateNormalBillBatch } from "../usebatch";

export const useGenerateNormalBillForm = ({ batchId }) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useGenerateNormalBillBatch({});

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
