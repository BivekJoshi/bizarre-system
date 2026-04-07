import { useState } from "react";
import { useFormik } from "formik";
import { authSchema } from "./authSchema";
import { useAuth } from "../useAuth";

export const useAuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isLoading } = useAuth({});
  const formik = useFormik({
    initialValues: {
      mobileNumber: "",
      password: "",
    },
    validationSchema: authSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleLogin = (values) => {
    const { mobileNumber, password } = values;

    const trimmedPassword = password.trim();
    mutate({ mobileNumber, password: trimmedPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    loading: isLoading,
    formik,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
  };
};
