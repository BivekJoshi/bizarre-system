import { useFormik } from "formik";
import { useGenerateProfitLossReport } from "../useReport";
import * as Yup from "yup";

export const useProfitLossReportForm = ({ profitLossReport }) => {
  const { mutate } = useGenerateProfitLossReport({});

  const profitLossReportSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: {
      year: "",
      month: "",
      branchId: "",
    },
    validationSchema: profitLossReportSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleAddRequest(values);
    },
  });

  const handleAddRequest = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        profitLossReport(data?.data?.data);
      },
    });
  };

  return {
    formik,
  };
};
