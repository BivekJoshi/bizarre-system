import { useFormik } from "formik";
import { useDownloadItemSalesReport } from "../useReport";
import { useEffect } from "react";

export const useItemSalesReportDownloadForm = ({
  onClose,
  salesItemReport,
}) => {
  const { mutate } = useDownloadItemSalesReport({});

  const today = new Date();
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(today.getMonth() - 1);

  const formik = useFormik({
    initialValues: {
      from: lastMonthDate.toISOString().slice(0, 10),
      to: today.toISOString().slice(0, 10),
      itemType: "" || "FOOD",
      fileType: "" || "excel",
    },
    // validationSchema: branchSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleAddRequest(values);
    },
  });

  const handleAddRequest = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        salesItemReport(data?.data?.data);
        onClose && onClose();
      },
    });
  };

  return {
    formik,
  };
};
