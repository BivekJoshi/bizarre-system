import { useFormik } from "formik";

import { useForgotPassword } from "../useUser";
import { useNavigate } from "react-router-dom";

export const useForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useForgotPassword({});

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
    loading: isLoading,
  };
};
