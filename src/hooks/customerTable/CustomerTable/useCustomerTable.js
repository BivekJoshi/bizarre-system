import { useFormik } from "formik";
import { useAddCustomerTable, useEditCustomerTable } from "../useCustomerTable";

export const useCustomerTableForm = ({ onClose, data }) => {
  const { mutate: addMutate } = useAddCustomerTable({});
  const { mutate: editMutate } = useEditCustomerTable({});

  const formik = useFormik({
    initialValues: {
      id: data?.id || "",
      tableNumber: data?.tableNumber || "",
      status: data?.status || "",
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
