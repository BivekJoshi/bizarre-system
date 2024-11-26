import { useFormik } from "formik";
import { useDownloadItemSalesReport } from "../useReport";
import { DOC_URL } from "../../../api/axiosInterceptor";

export const useItemSalesReportDownloadForm = ({ setData, fileType }) => {
  const { mutate } = useDownloadItemSalesReport({});

  const formik = useFormik({
    initialValues: {
      from: setData?.from || "",
      to: setData?.to || "",
      itemType: setData?.itemType || "FOOD",
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
