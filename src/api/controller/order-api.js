import { ORDER } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*_____________________________POST_______________________________________________ */
export const addOrder = async (formData) => {
  const data = await axiosInstance.post(`${ORDER}/place-order`, formData);
  return data;
};

/*________________________GET ALL_____________________________________*/
export const getOrder = async (pageNumber, pageSize) => {
  if (pageNumber && pageSize) {
    const { data } = await axiosInstance.get(
      `${ORDER}/find?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return data?.data;
  }
};

/*________________________GET SERVED_____________________________________*/
export const getOrderServed = async (orderId) => {
  if (orderId) {
    const { data } = await axiosInstance.get(`${ORDER}/find`);
    return data?.data;
  }
};

/*________________________GET READY_____________________________________*/
export const getOrderReady = async (orderId) => {
  if (orderId) {
    const { data } = await axiosInstance.get(`${ORDER}/find`);
    return data?.data;
  }
};

/*________________________GET PREPARING_____________________________________*/
export const getPreparing = async (orderId) => {
  if (orderId) {
    const { data } = await axiosInstance.get(`${ORDER}/find`);
    return data?.data;
  }
};
/*________________________GET_BY_ID_____________________________________*/
export const getOrderById = async (id) => {
  if (id) {
    const { data } = await axiosInstance.get(`${ORDER}/${id}`);
    return data;
  }
};

/*________________________PATCH_____________________________________*/
export const editOrder = async (formData) => {
  const data = await axiosInstance.put(`${ORDER}/add-order`, formData);
  return data;
};
