import { useFormik } from "formik";
import { useState } from "react";
import { useGenerateRouletteBillBatch } from "../usebatch";
import * as Yup from "yup";

export const useGenerateRouletteBillForm = ({ batchId }) => {
  const { mutate, isLoading } = useGenerateRouletteBillBatch({});

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
    values = { ...values };
    mutate(values, {
      onSuccess: () => {
        formik.resetForm();
      },
      onError: () => {},
    });
  };

  return {
    formik,
    loading: isLoading,
  };
};
