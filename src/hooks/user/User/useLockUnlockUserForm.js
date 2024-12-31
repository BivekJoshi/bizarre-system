import { useFormik } from "formik";

import { useLockUser, useUnLockUser } from "../useUser";

export const useLockUserForm = ({ userId, closeShowMessage }) => {
  const { mutate, isLoading: loading } = useLockUser({});

  const formik = useFormik({
    initialValues: {
      userId: userId || "",
      reason: "",
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
        closeShowMessage();
      },
    });
  };

  return {
    formik,
    loading,
  };
};

export const useUnLockUserForm = ({ userId, closeShowMessage }) => {
  const { mutate, isLoading: loading } = useUnLockUser({});

  const formik = useFormik({
    initialValues: {
      userId: userId || "",
      reason: "",
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
        closeShowMessage();
      },
    });
  };

  return {
    formik,
    loading,
  };
};
