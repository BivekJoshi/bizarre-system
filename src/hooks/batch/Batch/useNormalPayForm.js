import { useFormik } from "formik";
import { useState } from "react";
import { useNormalPayBatch } from "../usebatch";
import { useParams } from "react-router-dom";

export const useNormalPayForm = ({ batchId, onClose }) => {
  const { mutate ,isLoading} = useNormalPayBatch({});
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      customerTableId: id || "",
      cashReceived: "" || 0,
      bankReceived: "" || 0,
      coinsReceived: "" || 0,
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
      onSuccess: () => {
        onClose();
      },
    });
  };

  return {
    formik,
    loading:isLoading,
  };
};
