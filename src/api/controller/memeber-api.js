import { MEMBER } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*_____________________________POST MEMBER WAITER_______________________________________________ */
export const addWaiterMember = async (formData) => {
  const data = await axiosInstance.post(`${MEMBER}/waiter/save`, formData);
  return data;
};
/*_____________________________POST MEMBER CASHIER_______________________________________________ */
export const addCashierMember = async (formData) => {
  const data = await axiosInstance.post(`${MEMBER}/cashier/save`, formData);
  return data;
};
/*_____________________________POST MEMBER BRANCH OWNER_______________________________________________ */
export const addBranchOwnerMember = async (formData) => {
  const data = await axiosInstance.post(`${MEMBER}/branch-owner/save`, formData);
  return data;
};

/*________________________GET_____________________________________*/
export const getMember = async () => {
  const { data } = await axiosInstance.get(`${MEMBER}/find`);
  return data?.data;
};

/*________________________GET_BY_ID_____________________________________*/
export const getMemberById = async (id) => {
  if (id) {
    const { data } = await axiosInstance.get(`${MEMBER}/${id}`);
    return data;
  }
};

/*________________________PATCH_____________________________________*/
export const editMember = async (formData) => {
  const data = await axiosInstance.put(`${MEMBER}/save`, formData);
  return data;
};

/*________________________DELETE_____________________________________*/
// export const deleteMember = async (id) => {
//   if (id) {
//     const data = await axiosInstance.delete(`${MEMBER}/${id}`);
//     return data;
//   }
// };
