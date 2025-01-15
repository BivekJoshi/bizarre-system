import { useFormik } from "formik";
import { useDownloadProfitLossReport } from "../useReport";
import { DOC_URL } from "../../../api/axiosInterceptor";

export const useProfitLossReportDownloadForm = ({ setData, fileType }) => {
  const { mutate } = useDownloadProfitLossReport({});

  const formik = useFormik({
    initialValues: {
      year: setData?.year || "",
      month: setData?.month || "",
      branchId: setData?.branchId || "",
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
