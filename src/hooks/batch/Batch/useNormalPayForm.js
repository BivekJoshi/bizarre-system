import { useFormik } from "formik";
import { useState } from "react";
import { useNormalPayBatch } from "../usebatch";

export const useNormalPayForm = ({ batchId }) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useNormalPayBatch({});

  const formik = useFormik({
    initialValues: {
      batchId: batchId || "",
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
