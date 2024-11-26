import { useFormik } from "formik";
import { useDownloadBatchOrderReport } from "../useReport";
import { useEffect } from "react";

export const useBatchOrderReportDownloadForm = ({
  setData,
  fileType,
  salesItemReport,
}) => {
  const { mutate } = useDownloadBatchOrderReport({});

  const today = new Date();
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(today.getMonth() - 1);

  const formik = useFormik({
    initialValues: {
      from: setData?.from || "",
      to: setData?.to || "",
      branchId: setData?.branchId || "",
      tableId: setData?.tableId || "",
      customerName: setData?.customerName || "",
      memberName: setData?.memberName || "",
      fileType: fileType || "excel",
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
        formik.resetForm();
      },
    });
  };

  return {
    formik,
  };
};
