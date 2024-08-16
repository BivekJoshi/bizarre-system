import { useFormik } from "formik";

import { useAddBook, useEditBook } from "../useBook";

export const useBookForm = ({ onClose, data }) => {
  const { mutate: addMutate } = useAddBook({});
  const { mutate: editMutate } = useEditBook({});

  const formik = useFormik({
    initialValues: {
      id: data?.id || "",
      title: data?.title || "",
      author: data?.author || "",
      publicationDate: data?.publicationDate || "",
      isbn: data?.isbn || "",
      genre: data?.genre || "",
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
