import { REPORT } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*________________________GET REPORT DASHBOARD_____________________________________*/
export const getReportDashboard = async () => {
  const { data } = await axiosInstance.get(`${REPORT}/dashboard`);
  return data?.data;
};

/*_____________________________POST AND GET ITEM SALES REPORT (GENERATE)_______________________________________________ */
export const generateItemSalesReport = async (formData) => {
  const data = await axiosInstance.post(`${REPORT}/item-sales-report/generate`, formData);
  return data;
};

/*_____________________________POST AND GET ITEM SALES REPORT (DOWNLOAD)_______________________________________________ */
export const downloadItemSalesReport = async (formData) => {
  const data = await axiosInstance.post(`${REPORT}/item-sales-report/download`, formData);
  return data;
};

/*_____________________________POST AND GET ITEM BATCH ORDER REPORT (GENERATE)_______________________________________________ */
export const generateBatchOrderReport = async (formData) => {
  const data = await axiosInstance.post(`${REPORT}/batch-order-report/generate`, formData);
  return data;
};

/*_____________________________POST AND GET ITEM BATCH ORDER REPORT  (DOWNLOAD)_______________________________________________ */
export const downloadBatchOrderReport = async (formData) => {
  const data = await axiosInstance.post(`${REPORT}/batch-order-report/download`, formData);
  return data;
};
