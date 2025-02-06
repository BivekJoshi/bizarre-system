import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { debounce } from "@mui/material";
import { useFilterExpenses } from "../../useExpense";
import { useParams } from "react-router-dom";

export const useFilterExpenseForm = ({ expenseData, successFlag }) => {
  const { mutate, isLoading } = useFilterExpenses({});
  const [loading, setLoading] = useState(false);
  const { status } = useParams();
  console.log("🚀 ~ useFilterExpenseForm ~ status:", status);

  const formik = useFormik({
    initialValues: {
      search: [
        { field: "verified", value: status === "verified" ? true : false },
      ],
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
        expenseData(data?.data?.data);
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
