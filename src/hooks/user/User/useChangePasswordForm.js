import { useFormik } from "formik";

import { useChangePassword, useGetUserData } from "../useUser";
import { useState } from "react";
import { userSchema } from "./userSchema";
import { useNavigate } from "react-router-dom";

export const useChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { mutate } = useChangePassword({});
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
      onSucc;
    },
  });

  const handledAddRequest = (values) => {
    setLoading(true);
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
    loading,
  };
};
