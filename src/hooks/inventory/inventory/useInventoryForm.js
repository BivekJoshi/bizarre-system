import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useFilterItem } from "../../useItem";
import { debounce } from "@mui/material";

export const useInventoryForm = ({ itemData, successFlag }) => {
  const { mutate, isLoading } = useFilterItem({});
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      search: [
        {
          field: "",
          value: "",
          type: "",
          object: "",
        },
      ],

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
        itemData(data?.data?.data);
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
    loading: isLoading || loading,
  };
};
