import { useFormik } from "formik";
import { useState } from "react";
import { useSplitPayBatch } from "../usebatch";
import * as Yup from "yup";

export const useSplitPayForm = ({ batchId }) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSplitPayBatch({});

  const validationSchema = Yup.object({
    cashReceived: Yup.string().optional(),
    bankReceived: Yup.string().optional(),
    coinsReceived: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      customerTableId: "",
      cashReceived: "",
      bankReceived: "",
      coinsReceived: "",
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
        formik.resetForm();
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  return {
    formik,
    loading,
  };
};
