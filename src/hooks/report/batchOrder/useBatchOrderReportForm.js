import { useFormik } from "formik";
import { useGenerateBatchOrderReport } from "../useReport";
import { useEffect } from "react";

export const useBatchOrderReportForm = ({ onClose, salesItemReport }) => {
  const { mutate } = useGenerateBatchOrderReport({});

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
      // fileType: "",
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
  useEffect(() => {
    if (formik.values.from && formik.values.to) {
      handleAddRequest(formik.values); 
    }
  }, []);

  return {
    formik,
  };
};
