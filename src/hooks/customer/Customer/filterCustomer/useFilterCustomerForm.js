import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useFilterCustomer } from "../../useCustomer";
import { debounce } from "@mui/material";

export const useFilterCustomerForm = ({
  onClose,
  customerData,
  successFlag,
  editSuccessFlag,
}) => {
  const { mutate, isLoading } = useFilterCustomer({});

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
    mutate(values, {
      onSuccess: (data) => {
        customerData(data?.data?.data);
        onClose && onClose();
      },
      onError: () => {
      },
    });
  };

  const debouncedSearch = debounce(() => {
    handleAddRequest(formik.values);
  }, 300);

  useEffect(() => {
    if (formik?.values?.pageNumber > 0 || successFlag || editSuccessFlag) {
      debouncedSearch();
    }
  }, [formik.values.search, successFlag, editSuccessFlag]);
  return {
    formik,
    loading: isLoading,
  };
};
