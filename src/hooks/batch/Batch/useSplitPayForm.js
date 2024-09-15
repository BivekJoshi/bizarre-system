import { useFormik } from "formik";
import { useState } from "react";
import { useSplitPayBatch } from "../usebatch";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

export const useSplitPayForm = ({ batchId }) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSplitPayBatch({});
  const {id} = useParams();

  const validationSchema = Yup.object({
    cashReceived: Yup.string().optional(),
    bankReceived: Yup.string().optional(),
    coinsReceived: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      customerTableId: id || "",
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
