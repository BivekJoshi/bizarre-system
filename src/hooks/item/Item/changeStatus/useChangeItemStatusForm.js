import { useFormik } from "formik";

import { useChangeStatus } from "../../useItem";

export const useChangeItemStatusForm = ({ itemId, status, filterFormik }) => {
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
        filterFormik.handleSubmit();
      },
    });
  };

  return {
    formik,
    loading,
  };
};
