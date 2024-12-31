import { useFormik } from "formik";

import { useChangeStatus } from "../../useItem";

export const useChangeItemStatusForm = ({ itemId, status }) => {
  const { mutate, isLoading: loading } = useChangeStatus({});

  const formik = useFormik({
    initialValues: {
      id: itemId || "",
      status: status || "",
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
        // closeShowMessage();
      },
    });
  };

  return {
    formik,
    loading,
  };
};
