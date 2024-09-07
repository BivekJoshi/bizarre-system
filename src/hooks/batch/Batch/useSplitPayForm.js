import { useFormik } from "formik";
import { useState } from "react";
import { useSplitPayBatch } from "../usebatch";

export const useSplitPayForm = () => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSplitPayBatch({});

  const formik = useFormik({
    initialValues: {
      customerTableId: "",
      cashReceived: "",
      bankReceived: "",
      coinsReceived: "",
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
