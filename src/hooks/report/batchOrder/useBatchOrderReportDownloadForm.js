import { useFormik } from "formik";
import { useDownloadBatchOrderReport } from "../useReport";
import { useEffect } from "react";

export const useBatchOrderReportDownloadForm = ({
  onClose,
  salesItemReport,
}) => {
  const { mutate } = useDownloadBatchOrderReport({});

  const today = new Date();
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(today.getMonth() - 1);

  const formik = useFormik({
    initialValues: {
      from: lastMonthDate.toISOString().slice(0, 10),
      to: today.toISOString().slice(0, 10),
      branchId: "",
      tableId: "",
      customerName: "",
      memberName: "",
      fileType: "" || "xml",
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
