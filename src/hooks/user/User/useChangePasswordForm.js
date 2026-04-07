import { useFormik } from "formik";

import { useChangePassword, useGetUserData } from "../useUser";
import { useState } from "react";
import { userSchema } from "./userSchema";
import { useNavigate } from "react-router-dom";

export const useChangePasswordForm = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useChangePassword({});
  const { data: userData, isLoading: isLoadingUserData } = useGetUserData();

  const formik = useFormik({
    initialValues: {
      mobileNumber: userData?.data?.mobileNumber || "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: userSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handledAddRequest(values);
    },
  });

  const handledAddRequest = (values) => {
    values = { ...values };
    mutate(values, {
      onSuccess: () => {
        navigate("/");
        localStorage.clear();
      },
    });
  };

  return {
    formik,
    loading: isLoading || isLoadingUserData,
  };
};
