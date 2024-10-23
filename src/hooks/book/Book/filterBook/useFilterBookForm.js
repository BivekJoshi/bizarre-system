import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useFilterBook } from "../../useBook";
import { debounce } from "@mui/material";

export const useFilterBookForm = ({ onClose, bookData, successFlag }) => {
  const { mutate, isLoading } = useFilterBook({});
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      search: [],
      // pageable: {
      //   pageNumber: "" || 1,
      //   pageSize: "" || 10,
      // },
      actionType: "FILTER",
      pageNumber: "" || 1,
      noOfRecords: "" || 10,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      handleAddRequest(values);
    },
  });

  const handleAddRequest = (values) => {
    setLoading(true);
    mutate(values, {
      onSuccess: (data) => {
        bookData(data?.data?.data);
        onClose && onClose();
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  const debouncedSearch = debounce(() => {
    handleAddRequest(formik.values);
  }, 300);

  useEffect(() => {
    if (formik?.values?.pageNumber > 0 || successFlag) {
      debouncedSearch();
    }
  }, [formik.values.search, successFlag]);

  return {
    formik,
    loading,
  };
};
