import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useFilterBranch } from "../../useBranch";
import { debounce } from "@mui/material";

export const useFilterBranchForm = ({ onClose, branchData, successFlag }) => {
  const { mutate, isLoading } = useFilterBranch({});

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
        branchData(data?.data?.data);
        onClose && onClose();
      },
      onError: () => {},
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
    loading: isLoading,
  };
};
