import { useFormik } from "formik";
import { useGenerateItemSalesReport } from "../useReport";
import * as Yup from "yup";

export const useItemSalesReportForm = ({ salesItemReport }) => {
  const { mutate } = useGenerateItemSalesReport({});

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
      itemId: "",
      itemType: "" || "FOOD",
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
