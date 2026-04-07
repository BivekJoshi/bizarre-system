import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useGenerateSplitBillBatch } from "../usebatch";
import { useGetCustomerByMobileNumber } from "../../customer/useCustomer";

export const useGenerateSplitBillForm = ({ batchId, finalBill }) => {
  const { mutate, isLoading } = useGenerateSplitBillBatch({});

  const validationSchema = Yup.object({
    // mobileNumbers: Yup.array()
    //   .of(Yup.string().optional("Mobile number is required"))
    //   .min(1, "At least one mobile number is required"),
    promoCode: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      batchId: batchId || "",
      mobileNumbers: [""],
      promoCode: "",
    },
    // validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handledAddRequest(values);
    },
  });

  const handledAddRequest = (values) => {
    values = { ...values };

    mutate(values, {
      onSuccess: (data) => {
        formik.resetForm();
        finalBill(data?.data?.data);
      },
      onError: () => {},
    });
  };

  return {
    formik,
    loading: isLoading,
  };
};
