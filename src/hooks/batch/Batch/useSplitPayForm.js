import { useFormik } from "formik";
import { useState } from "react";
import { useSplitPayBatch } from "../usebatch";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

export const useSplitPayForm = ({ batchId, onClose }) => {
  const { mutate, isLoading } = useSplitPayBatch({});
  const { id } = useParams();

  const validationSchema = Yup.object({
    cashReceived: Yup.string().optional(),
    bankReceived: Yup.string().optional(),
    coinsReceived: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      customerTableId: id || "",
      cashReceived: "" || 0,
      bankReceived: "" || 0,
      coinsReceived: "" || 0,
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
        formik.resetForm();
        onClose();
      },
      onError: () => {
        onClose();
      },
    });
  };

  return {
    formik,
    loading: isLoading,
  };
};
