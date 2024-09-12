import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useGenerateSplitBillBatch } from "../usebatch";

export const useGenerateSplitBillForm = ({ batchId }) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useGenerateSplitBillBatch({});

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
    validationSchema,
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
