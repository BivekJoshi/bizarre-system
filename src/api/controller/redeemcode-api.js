import { REDEEM_CODE } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*_____________________________POST_______________________________________________ */
export const addRedeemCode = async (formData) => {
  const data = await axiosInstance.post(`${REDEEM_CODE}/save`, formData);
  return data;
};

/*_____________________________POST WITH OUT AUTH_______________________________________________ */
export const addRedeemCodeWithoutAuth = async (formData) => {
  const data = await axiosInstance.post(
    `${REDEEM_CODE}/redeem-without-auth`,
    formData
  );
  return data;
};

/*________________________GET_____________________________________*/
export const getRedeemCode = async (pageNumber, pageSize) => {
  if (pageNumber && pageSize) {
    const { data } = await axiosInstance.get(
      `${REDEEM_CODE}/find?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return data?.data;
  }
};

/*________________________GET_BY_ID_____________________________________*/
export const getRedeemCodeById = async (id) => {
  if (id) {
    const { data } = await axiosInstance.get(`${REDEEM_CODE}/${id}`);
    return data;
  }
};

/*________________________PATCH_____________________________________*/
export const editRedeemCode = async (formData) => {
  const data = await axiosInstance.put(`${REDEEM_CODE}/save`, formData);
  return data;
};
