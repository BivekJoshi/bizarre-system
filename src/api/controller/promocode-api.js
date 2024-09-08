import { PROMO_CODE } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*_____________________________POST_______________________________________________ */
export const addPromoCode = async (formData) => {
  const data = await axiosInstance.post(`${PROMO_CODE}/save`, formData);
  return data;
};

/*________________________GET_____________________________________*/
export const getPromoCode = async (pageNumber, pageSize) => {
  if (pageNumber && pageSize) {
    const { data } = await axiosInstance.get(
      `${PROMO_CODE}/find?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return data?.data;
  }
};

/*________________________GET VALID PROMO CODE_____________________________________*/
export const getValidPromoCode = async (code, userType) => {
  if (code && userType) {
    const { data } = await axiosInstance.get(
      `${PROMO_CODE}/valid-promo-code?code=${code}&userType=${userType}`
    );
    return data?.data;
  }
};

/*________________________GET_BY_ID_____________________________________*/
export const getPromoCodeById = async (id) => {
  if (id) {
    const { data } = await axiosInstance.get(`${PROMO_CODE}/${id}`);
    return data;
  }
};

/*________________________PATCH_____________________________________*/
export const editPromoCode = async (formData) => {
  const data = await axiosInstance.put(`${PROMO_CODE}/save`, formData);
  return data;
};
