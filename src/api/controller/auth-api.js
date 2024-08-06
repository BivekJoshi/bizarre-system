import { axiosInstance } from "../axiosInterceptor";

export const authenticate = async (mobileNumber, password) => {
  const { data } = await axiosInstance.post("/authenticate", {
    mobileNumber,
    password,
  });
  return data;
};
