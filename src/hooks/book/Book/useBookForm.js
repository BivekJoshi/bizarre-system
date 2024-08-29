import { useFormik } from "formik";

import { useAddBook, useEditBook } from "../useBook";

export const useBookForm = ({ onClose, rowData }) => {
  const { mutate: addMutate } = useAddBook({});
  const { mutate: editMutate } = useEditBook({});

  const formik = useFormik({
    initialValues: {
      id: rowData?.id || "",
      title: rowData?.title || "",
      author: rowData?.author || "",
      publicationDate: rowData?.publicationDate || "",
      isbn: rowData?.isbn || "",
      genre: rowData?.genre || "",
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
