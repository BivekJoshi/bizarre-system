import { BOOK } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*_____________________________POST_______________________________________________ */
export const addBook = async (formData) => {
  const data = await axiosInstance.post(`${BOOK}/save`, formData);
  return data;
};

/*________________________GET_____________________________________*/
export const getBook = async () => {
  const { data } = await axiosInstance.get(`${BOOK}/find`);
  return data?.data;
};

/*________________________GET_BY_ID_____________________________________*/
export const getBookById = async (id) => {
  if (id) {
    const { data } = await axiosInstance.get(`${BOOK}/${id}`);
    return data;
  }
};

/*________________________PATCH_____________________________________*/
export const editBook = async (formData) => {
  const data = await axiosInstance.put(`${BOOK}/save`, formData);
  return data;
};

/*________________________DELETE_____________________________________*/
export const deleteBook = async (id) => {
  if (id) {
    const data = await axiosInstance.delete(`${BOOK}/${id}`);
    return data;
  }
};
