import { useFormik } from "formik";
import { useState } from "react";
import { useNormalPayBatch } from "../usebatch";
import { useParams } from "react-router-dom";

export const useNormalPayForm = ({ batchId }) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useNormalPayBatch({});
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      customerTableId: id || "",
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
