import { useFormik } from "formik";
import { useAddItem, useEditItem } from "../useItem";

export const useItemForm = ({ onClose, data }) => {
  const { mutate: addMutate } = useAddItem({});
  const { mutate: editMutate } = useEditItem({});

  const formik = useFormik({
    initialValues: {
      id: data?.id || "",
      name: data?.name || "",
      costPrice: data?.costPrice || "",
      markedPrice: data?.markedPrice || "",
      sellingPrice: data?.sellingPrice || "",
      description: data?.description || "",
      type: data?.type || "",
      stockCount: data?.stockCount || "",
      tags: data?.tags || "",
      color: data?.color || "",
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
