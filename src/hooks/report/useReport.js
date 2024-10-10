import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  downloadBatchOrderReport,
  downloadItemSalesReport,
  generateBatchOrderReport,
  generateItemSalesReport,
  getReportDashboard,
} from "../../api/controller/report-api";
import { toast } from "react-toastify";

/*________________________GET REPORT DASHBOARD_____________________________________*/
export const useGetReportDashboard = () => {
  return useQuery(["getReportDashboard"], () => getReportDashboard(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*_____________________________POST AND GET ITEM SALES REPORT (GENERATE)_______________________________________________ */
export const useGenerateItemSalesReport = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["generateItemSalesReport"],
    (formData) => generateItemSalesReport(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully generated item sales report");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getReportDashboard");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*_____________________________POST AND GET ITEM SALES REPORT (DOWNLOAD)_______________________________________________ */
export const useDownloadItemSalesReport = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["downloadItemSalesReport"],
    (formData) => downloadItemSalesReport(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully generated item sales report");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getReportDashboard");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*_____________________________POST AND GET ITEM BATCH ORDER REPORT (GENERATE)_______________________________________________ */
export const useGenerateBatchOrderReport = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["generateBatchOrderReport"],
    (formData) => generateBatchOrderReport(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully generated item sales report");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getReportDashboard");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*_____________________________POST AND GET ITEM BATCH ORDER REPORT  (DOWNLOAD)_______________________________________________ */
export const useDownloadBatchOrderReport = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["downloadBatchOrderReport"],
    (formData) => downloadBatchOrderReport(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully generated item sales report");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getReportDashboard");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};
