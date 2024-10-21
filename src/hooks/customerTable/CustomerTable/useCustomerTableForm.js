import { useFormik } from "formik";
import { useAddCustomerTable, useEditCustomerTable } from "../useCustomerTable";
import { useState, useEffect } from "react";

export const useCustomerTableForm = ({ onClose, rowData }) => {
  const { mutate: addMutate } = useAddCustomerTable({});
  const { mutate: editMutate } = useEditCustomerTable({});
  const [successFlag, setSuccessFlag] = useState(false); 

  const formik = useFormik({
    initialValues: {
      id: rowData?.id || "",
      tableNumber: rowData?.tableNumber || "",
      status: rowData?.status || "",
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
    addMutate(values, {
      onSuccess: () => {
        setSuccessFlag(true);
        onClose();

        setTimeout(() => {
          setSuccessFlag(false);
        }, 5000);
      },
      onError: () => {
        setSuccessFlag(false); 
      },
    });
  };

  const handledEditRequest = (values) => {
    editMutate(values, {
      onSuccess: () => {
        setSuccessFlag(true);
        onClose();

        setTimeout(() => {
          setSuccessFlag(false);
        }, 5000);
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
