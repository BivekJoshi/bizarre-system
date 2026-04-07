import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useFilterCustomerTable } from "../../useCustomerTable";
import { debounce } from "lodash";

export const useFilterCustomerTableForm = ({
  onClose,
  customerTableData,
  successFlag,
}) => {

  const { mutate, isLoading } = useFilterCustomerTable({});

  const formik = useFormik({
    initialValues: {
      search: [],
      actionType: "FILTER",
      pageNumber: 1,
      noOfRecords: 10,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      handleAddRequest(values);
    },
  });

  const handleAddRequest = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        customerTableData(data?.data?.data);
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
    if (formik?.values?.pageNumber > 0 || successFlag) {
      debouncedSearch();
    }
  }, [formik.values.search, successFlag]);

  return {
    formik,
    loading: isLoading ,
  };
};
