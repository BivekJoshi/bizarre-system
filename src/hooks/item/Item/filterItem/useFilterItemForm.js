import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useFilterItem } from "../../useItem";

export const useFilterItemForm = ({ onClose, itemData }) => {
  const { mutate } = useFilterItem({});
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      search: [],
      pageable: {
        pageNumber: "" || 1,
        pageSize: "" || 10,
      },
      actionType: "FILTER",
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

  useEffect(() => {
    if (formik?.values?.pageable?.pageNumber > 0) {
      handleAddRequest(formik.values);
    }
  }, [formik.values.search]);

  return {
    formik,
    loading,
  };
};
