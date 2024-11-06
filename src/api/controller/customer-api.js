import { CUSTOMER } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*_____________________________POST CUSTOMER_______________________________________________ */
export const addCustomer = async (formData) => {
  const data = await axiosInstance.post(`${CUSTOMER}/save`, formData);
  return data;
};

/*_____________________________POST CUSTOMER ONBOARD_______________________________________________ */
export const addCustomerByOnBoard = async (formData) => {
  const data = await axiosInstance.post(`${CUSTOMER}/onboard`, formData);
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

/*____________________________FILTER_CUSTOMER_______________________________________________ */
export const filterCustomer = async (formData) => {
  const { field, value, ...rest } = formData;

  const updatedFormData = {
    ...rest,
    search: [...(formData.search || []), { field, value }],
    pageNumber: formData?.pageNumber,
    noOfRecords: formData?.noOfRecords,
  };

  const data = await axiosInstance.post(`${CUSTOMER}/find`, updatedFormData);
  return data;
};

/*________________________VERIFY CUSTOMER_____________________________________*/
export const verifyCustomer = async (id) => {
  if (id) {
    const { data } = await axiosInstance.get(`${CUSTOMER}/verify/${id}`);
    return data;
  }
};

/*________________________GET_BY_MOBILE_NUMBER_____________________________________*/
export const getCustomerByMobileNumber = async (mobileNumber) => {
  const { data } = await axiosInstance.get(
    `${CUSTOMER}/find/mobile-number/${mobileNumber}`
  );
  return data;
};
