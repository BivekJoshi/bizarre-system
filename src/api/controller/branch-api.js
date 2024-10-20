import { BRANCH } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*_____________________________POST BRANCH_______________________________________________ */
export const addBranch = async (formData) => {
  const data = await axiosInstance.post(`${BRANCH}/save`, formData);
  return data;
};

/*________________________GET_____________________________________*/
export const getBranch = async (pageNumber, pageSize) => {
  if (pageNumber && pageSize) {
    const { data } = await axiosInstance.get(
      `${BRANCH}/find?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return data?.data;
  }
};

/*________________________GET_BY_ID_____________________________________*/
export const getBranchById = async (id) => {
  if (id) {
    const { data } = await axiosInstance.get(`${BRANCH}/${id}`);
    return data;
  }
};

/*________________________PATCH_____________________________________*/
export const editBranch = async (formData) => {
  const data = await axiosInstance.put(`${BRANCH}/save`, formData);
  return data;
};

/*________________________DELETE_____________________________________*/
export const deleteBranch = async (id) => {
  if (id) {
    const data = await axiosInstance.delete(`${BRANCH}/${id}`);
    return data;
  }
};

/*____________________________FILTER_BRANCH_______________________________________________ */
export const filterBranch = async (formData) => {
  const { field, value, ...rest } = formData;

  const updatedFormData = {
    ...rest,
    search: [...(formData.search || []), { field, value }],
    pageNumber: formData?.pageNumber,
    noOfRecords: formData?.noOfRecords,
  };

  const data = await axiosInstance.post(`${BRANCH}/find`, updatedFormData);
  return data;
};
