import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useFilterCustomerTable } from "../../useCustomerTable";

export const useFilterCustomerTableForm = ({ onClose, customerTableData }) => {
  const { mutate } = useFilterCustomerTable({});
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
        customerTableData(data?.data?.data);
        onClose && onClose();
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    if (formik?.values?.pageNumber > 0) {
      handleAddRequest(formik.values);
    }
  }, [formik.values.search]);

  return {
    formik,
    loading,
  };
};
