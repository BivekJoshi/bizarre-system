import { useFormik } from "formik";

import { useForgotPassword } from "../useUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { mutate } = useForgotPassword({});

  const formik = useFormik({
    initialValues: {
      mobileNumber: "",
      birthDate: "",
      passwordRequestType: "EMAIL",
    },
    // validationSchema: userSchema,
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
