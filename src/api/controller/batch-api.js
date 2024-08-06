import { BATCH } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*___________________________GET_____________________________________*/
export const getReward = async () => {
  const { data } = await axiosInstance.get(`${BATCH}/getall`);
  return data;
};

// /*___________________________GET_By_ID_____________________________________*/
// export const getRewardId = async (id) => {
//   if (id) {
//     const { data } = await axiosInstance.get(
//       /reward/getbyid/${id}
//     );
//     return data;
//   }
// };

// /*___________________________POST_____________________________________*/
// export const addReward = async (formData) => {
//   const data = await axiosInstance.post(
//     /reward/create,
//     formData
//   );
//   return data;
// };

// /*___________________________PATCH_____________________________________*/
// export const editReward = async (formData) => {
//   const data = await axiosInstance.patch(
//     /reward/update,
//     formData
//   );
//   return data;
// };
// /*___________________________DELETE_____________________________________*/
// export const deleteReward = async (id) => {
//   if (id) {
//     const data = await axiosInstance.delete(
//       /reward/delete/${id}
//     );
//     return data;
//   }
// };