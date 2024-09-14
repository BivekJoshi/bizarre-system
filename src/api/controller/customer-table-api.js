import { CUSTOMER_TABLE } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*_____________________________POST CUSTOMER_______________________________________________ */
export const addCustomerTable = async (formData) => {
  const data = await axiosInstance.post(`${CUSTOMER_TABLE}/save`, formData);
  return data;
};

/*________________________GET_____________________________________*/
export const getCustomerTable = async (pageNumber, pageSize) => {
  if (pageNumber && pageSize) {
    const { data } = await axiosInstance.get(
      `${CUSTOMER_TABLE}/find?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return data?.data;
  }
};

/*________________________GET_____________________________________*/
export const getCustomerTableByStatus = async (status) => {
  if (status) {
    const { data } = await axiosInstance.get(
      `${CUSTOMER_TABLE}/find/status/${status}`
    );
    return data?.data;
  }
};

/*________________________GET_BY_ID_____________________________________*/
export const getCustomerTableById = async (id) => {
  if (id) {
    const { data } = await axiosInstance.get(`${CUSTOMER_TABLE}/${id}`);
    return data;
  }
};

/*________________________PATCH_____________________________________*/
export const editCustomerTable = async (formData) => {
  const data = await axiosInstance.put(`${CUSTOMER_TABLE}/save`, formData);
  return data;
};
