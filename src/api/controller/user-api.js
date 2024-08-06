import {  USER } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*_____________________________CHANGE PASSWORD_______________________________________________ */
export const changePassword = async (formData) => {
  const data = await axiosInstance.post(`${USER}/change-password`, formData);
  return data;
};