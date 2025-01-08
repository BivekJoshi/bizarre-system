import { useFormik } from "formik";
import { useState } from "react";
import { useAddExpense, useEditExpense } from "../../useExpense";

export const useAddExpenseForm = ({ onClose, rowData }) => {
  const { mutate: addMutate } = useAddExpense({});
  const { mutate: editMutate } = useEditExpense({});
  const [successFlag, setSuccessFlag] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: rowData?.id || "",
      expenseType: rowData?.expenseType || "",
      description: rowData?.description || "",
      paymentType: rowData?.paymentType || "",
      amount: rowData?.amount || "",
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
        formik.resetForm();

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
        formik.resetForm();

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
