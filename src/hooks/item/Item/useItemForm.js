import { useFormik } from "formik";
import { useAddItem, useEditItem } from "../useItem";
import { useState } from "react";

export const useItemForm = ({ onClose, rowData }) => {
  const { mutate: addMutate } = useAddItem({});
  const { mutate: editMutate } = useEditItem({});
  const [successFlag, setSuccessFlag] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: rowData?.id || "",
      name: rowData?.name || "",
      costPrice: rowData?.costPrice || "",
      markedPrice: rowData?.markedPrice || "",
      sellingPrice: rowData?.sellingPrice || "",
      description: rowData?.description || "",
      type: rowData?.type || "",
      stockCount: rowData?.stockCount || "",
      tags: rowData?.tags || "",
      color: rowData?.color || "",
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
