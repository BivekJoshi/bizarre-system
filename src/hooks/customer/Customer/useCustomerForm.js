import { useFormik } from "formik";

// import { branchSchema } from "./branchSchema";
import { useAddCustomer, useEditCustomer } from "../useCustomer";
import { useState } from "react";

export const useCustomerForm = ({ onClose, rowData }) => {
  const { mutate: addMutate } = useAddCustomer({});
  const { mutate: editMutate } = useEditCustomer({});
  const [successFlag, setSuccessFlag] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: rowData?.id || "",
      fullName: rowData?.user?.fullName || "",
      gender: rowData?.user?.gender || "",
      birthDate: rowData?.user?.birthDate || "",
      address: rowData?.user?.address || "",
      email: rowData?.user?.email || "",
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
        setSuccessFlag(true);
        onClose();

        setTimeout(() => {
          setSuccessFlag(false);
        }, 1000);
      },
      onError: () => {
        setSuccessFlag(false);
      },
    });
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editMutate(values, {
      onSuccess: () => {
        setSuccessFlag(true);
        onClose();

        setTimeout(() => {
          setSuccessFlag(false);
        }, 1000);
      },
      onError: () => {
        setSuccessFlag(false);
      },
    });
  };

  return {
    formik,
    successFlag,
  };
};
