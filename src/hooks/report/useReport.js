import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  downloadBatchOrderReport,
  downloadItemSalesReport,
  downloadProfitLossReport,
  generateBatchOrderReport,
  generateItemSalesReport,
  generateProfitLossReport,
  getReportDashboard,
} from "../../api/controller/report-api";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/getErrorMessage";

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
        toast.success("Successfully dowmloaded item sales report");
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
        toast.success("Successfully generated batch report");
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
        toast.success("Successfully download batch report");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getReportDashboard");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*_____________________________POST AND GET PROFIT LOSS REPORT (GENERATE)_______________________________________________ */
export const useGenerateProfitLossReport = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["generateProfitLossReport"],
    (formData) => generateProfitLossReport(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully generated profit loss report");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getReportDashboard");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*_____________________________POST AND GET PROFIT LOSS REPORT (DOWNLOAD)_______________________________________________ */
export const useDownloadProfitLossReport = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["downloadProfitLossReport"],
    (formData) => downloadProfitLossReport(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully downloaded profit loss report");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getReportDashboard");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};