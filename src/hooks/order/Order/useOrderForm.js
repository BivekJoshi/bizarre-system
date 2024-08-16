import { useFormik } from "formik";

import { useAddOrder, useEditOrder } from "../useOrder";

export const useOrderForm = ({ onClose, data }) => {
  const { mutate: addMutate } = useAddOrder({});
  const { mutate: editMutate } = useEditOrder({});

  const formik = useFormik({
    initialValues: {
      id: data?.id || "",
      customerTableId:"",
      
    },
    // validationSchema: branchSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values?.id) {
        handledEditRequest(values);
      } else {
        handledAddRequest(values);
      }
    },
  });

  const handledAddRequest = (values) => {
    values = { ...values };
    addMutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editMutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return {
    formik,
  };
};
