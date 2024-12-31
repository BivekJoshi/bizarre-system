import { SETTING } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*________________________GET_____________________________________*/
export const getSetting = async () => {
  const { data } = await axiosInstance.get(`${SETTING}/find`);
  return data?.data;
};
/*_____________________________POST_______________________________________________ */
export const addSetting = async (formData) => {
  const data = await axiosInstance.put(`${SETTING}/save`, formData);
  return data;
};
