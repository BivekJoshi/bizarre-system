import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useFilterItem, useRevealItem } from "../../useItem";
import { debounce } from "@mui/material";

export const useFilterItemForm = ({
  onClose,
  itemData,
  type,
  successFlag,
  editSuccessFlag,
}) => {
  const { mutate, isLoading } = useRevealItem({});
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      search: type
        ? [
            {
              field: "type",
              value: type,
            },
          ]
        : [],
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
        itemData(data?.data?.data);
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
    if (formik?.values?.pageNumber > 0 || successFlag || editSuccessFlag) {
      debouncedSearch();
    }
  }, [formik.values.search, successFlag, editSuccessFlag]);

  return {
    formik,
    loading: isLoading || loading,
  };
};
