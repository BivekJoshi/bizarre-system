import { ITEM } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*________________________GET_____________________________________*/
export const getItem = async () => {
  const { data } = await axiosInstance.get(`${ITEM}/find`);
  return data?.data;
};

/*________________________GET_BY_ID_____________________________________*/
export const getItemById = async (id) => {
  if (id) {
    const { data } = await axiosInstance.get(`${ITEM}/${id}`);
    return data;
  }
};

/*________________________PATCH_____________________________________*/
export const editItem = async (formData) => {
  const data = await axiosInstance.put(`${ITEM}/save`, formData);
  return data;
};

/*_____________________________POST_______________________________________________ */
export const addItem = async (formData) => {
  const data = await axiosInstance.post(`${ITEM}/save`, formData);
  return data;
};

/*_____________________________POST CHANGE STATUS______________________________________________ */
export const addItemChangeStatus = async (formData) => {
  const data = await axiosInstance.post(`${ITEM}/change-status`, formData);
  return data;
};
