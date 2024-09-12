import { BATCH } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*___________________________GET_By_ID_____________________________________*/
export const getBatchByTableId = async (tableId) => {
  if (tableId) {
    const { data } = await axiosInstance.get(`${BATCH}/find/${tableId}`);
    return data;
  }
};

/*___________________________SWITCH TABLE_____________________________________*/
export const switchTableBatch = async (formData) => {
  const data = await axiosInstance.post(`${BATCH}/switch-table`, formData);
  return data;
};

/*___________________________SPLIT PAY_____________________________________*/
export const splitPayBatch = async (formData) => {
  const data = await axiosInstance.post(`${BATCH}/split-pay`, formData);
  return data;
};

/*___________________________NORMAL PAY_____________________________________*/
export const normalPayBatch = async (formData) => {
  const data = await axiosInstance.post(`${BATCH}/normal-pay`, formData);
  return data;
};

/*___________________________GENERATE SPLIT BILL_____________________________________*/
export const generateSplitBillBatch = async (formData) => {
  const data = await axiosInstance.post(`${BATCH}/generate-split-bill`, formData);
  return data;
};

/*___________________________GENERATE ROULETTE BILL_____________________________________*/
export const generateRouletteBillBatch = async (formData) => {
  const data = await axiosInstance.post(`${BATCH}/generate-roulette-bill`, formData);
  return data;
};

/*___________________________GENERATE NORMAL BILL_____________________________________*/
export const generateNormalBillBatch = async (formData) => {
  const data = await axiosInstance.post(`${BATCH}/generate-normal-bill`, formData);
  return data;
};

/*___________________________BYPASS PAYMEN_____________________________________*/
export const bypassPaymentBatch = async (formData) => {
  const data = await axiosInstance.post(`${BATCH}/bypass-payment`, formData);
  return data;
};
