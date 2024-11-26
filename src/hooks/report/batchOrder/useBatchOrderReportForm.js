import { useFormik } from "formik";
import { useGenerateBatchOrderReport } from "../useReport";
import * as Yup from "yup";

export const useBatchOrderReportForm = ({ salesItemReport }) => {
  const { mutate } = useGenerateBatchOrderReport({});

  const batchOrderReportSchema = Yup.object().shape({
    from: Yup.date()
      .required("Start date is required")
      .typeError("Invalid date format"),
    to: Yup.date()
      .required("End date is required")
      .typeError("Invalid date format")
      .min(Yup.ref("from"), "End date must be after start date"),
  });

  const formik = useFormik({
    initialValues: {
      from: "",
      to: "",
      branchId: "",
      tableId: "",
      customerName: "",
      memberName: "",
      // fileType: "",
    },
    validationSchema: batchOrderReportSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleAddRequest(values);
    },
  });

  const handleAddRequest = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        salesItemReport(data?.data?.data);
      },
    });
  };

  return {
    formik,
  };
};
