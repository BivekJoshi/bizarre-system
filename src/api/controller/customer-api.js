import { CUSTOMER } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*_____________________________POST CUSTOMER_______________________________________________ */
export const addCustomer = async (formData) => {
  const data = await axiosInstance.post(`${CUSTOMER}/save`, formData);
  return data;
};

/*________________________GET_____________________________________*/
export const getCustomer = async (pageNumber, pageSize) => {
  if (pageNumber && pageSize) {
    const { data } = await axiosInstance.get(
      `${CUSTOMER}/find?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return data?.data;
  }
};

/*________________________GET_BY_ID_____________________________________*/
export const getCustomerById = async (id) => {
  if (id) {
    const { data } = await axiosInstance.get(`${CUSTOMER}/${id}`);
    return data;
  }
};

/*________________________PATCH_____________________________________*/
export const editCustomer = async (formData) => {
  const data = await axiosInstance.put(`${CUSTOMER}/save`, formData);
  return data;
};
