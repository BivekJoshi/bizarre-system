import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { debounce } from "@mui/material";
import { useFilterInventory } from "../useInventory";

export const useFilterInventoryForm = ({ inventoryData }) => {
  const { mutate, isLoading } = useFilterInventory({});
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
        inventoryData(data?.data?.data);
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
    if (formik?.values?.pageNumber > 0) {
      debouncedSearch();
    }
  }, [formik.values.search]);

  return {
    formik,
    loading,
  };
};
