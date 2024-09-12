import { useFormik } from "formik";
import { useState } from "react";
import { useGenerateRouletteBillBatch } from "../usebatch";
import * as Yup from "yup";

export const useGenerateRouletteBillForm = ({ batchId }) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useGenerateRouletteBillBatch({});

  const validationSchema = Yup.object({
    mobileNumbers: Yup.array()
      .of(Yup.string().required("Mobile number is required"))
      .min(1, "At least one mobile number is required"),
    promoCode: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      batchId: batchId || "",
      mobileNumbers: [""],
      promoCode: "",
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
