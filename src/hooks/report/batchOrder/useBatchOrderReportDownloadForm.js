import { useFormik } from "formik";
import { useDownloadBatchOrderReport } from "../useReport";
import { DOC_URL } from "../../../api/axiosInterceptor";

export const useBatchOrderReportDownloadForm = ({
  setData,
  fileType,
}) => {
  const { mutate } = useDownloadBatchOrderReport({});

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
    enableReinitialize: true,
    onSubmit: (values) => {
      handleAddRequest(values);
    },
  });

  const handleAddRequest = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        const fullURL = DOC_URL + data?.data?.data;
        window.open(fullURL, "_blank");
      },
    });
  };

  return {
    formik,
  };
};
