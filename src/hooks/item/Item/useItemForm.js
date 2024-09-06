import { useFormik } from "formik";
import { useAddItem, useEditItem } from "../useItem";

export const useItemForm = ({ onClose, rowData }) => {
  const { mutate: addMutate } = useAddItem({});
  const { mutate: editMutate } = useEditItem({});

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
