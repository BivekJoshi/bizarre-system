import { EXPENSE } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*________________________PATCH_____________________________________*/
export const editExpense = async (formData) => {
  const data = await axiosInstance.put(`${EXPENSE}/save`, formData);
  return data;
};

/*_____________________________POST_______________________________________________ */
export const addExpense = async (formData) => {
  const data = await axiosInstance.post(`${EXPENSE}/save`, formData);
  return data;
};

/*________________________GET_____________________________________*/
export const getExpense = async (pageNumber, pageSize) => {
  if (pageNumber && pageSize) {
    const { data } = await axiosInstance.get(
      `${EXPENSE}/find?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return data?.data;
  }
};

/*____________________________FILTER_EXPENSE____________________________________ */
export const filterExpense = async (formData) => {
  const { field, value, ...rest } = formData;

  const updatedFormData = {
    ...rest,
    search: [...(formData.search || []), { field, value }],
    pageNumber: formData?.pageNumber,
    noOfRecords: formData?.noOfRecords,
  };

  const data = await axiosInstance.post(
    `${EXPENSE}/find`,
    updatedFormData
  );
  return data;
};

/*________________________GET_BY_EXPENSE_ID_____________________________________*/
export const getExpenseById = async (id) => {
  if (id) {
    const { data } = await axiosInstance.get(`${EXPENSE}/${id}`);
    return data;
  }
};

/*________________________GET_BY_EXPENSE_VERIFY_BY_ID_____________________________________*/
export const getExpenseVerifyById = async (id) => {
  if (id) {
    const { data } = await axiosInstance.get(`${EXPENSE}/verify/${id}`);
    return data;
  }
};

/*________________________DELETE_____________________________________*/
export const deleteExpense = async (id) => {
  if (id) {
    const data = await axiosInstance.delete(`${EXPENSE}/remove/${id}`);
    return data;
  }
};
