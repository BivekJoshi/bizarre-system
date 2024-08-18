import { useFormik } from "formik";

// import { branchSchema } from "./branchSchema";
import { useAddCustomer, useEditCustomer } from "../useCustomer";

export const useCustomerForm = ({ onClose, data }) => {
  const { mutate: addMutate } = useAddCustomer({});
  const { mutate: editMutate } = useEditCustomer({});

  const formik = useFormik({
    initialValues: {
      id: data?.id || "",
      address: data?.address || "",
      phoneNumber: data?.phoneNumber || "",
      housingCapacity: data?.housingCapacity || "",
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
