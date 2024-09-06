import { getUser } from "../../utils/cookieHelper";
import { USER } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*________________________GET USER DATA_____________________________________*/
export const getUserData = async () => {
  const token = getUser();
  if (token) {
    const data = await axiosInstance.get(`${USER}/find/logged-in`);
    return data?.data;
  }
};

/*_____________________________CHANGE PASSWORD_______________________________________________ */
export const changePassword = async (formData) => {
  const data = await axiosInstance.post(`${USER}/change-password`, formData);
  return data;
};

/*_____________________________FORGET PASSWORD_______________________________________________ */
export const forgotPassword = async (formData) => {
  const data = await axiosInstance.post(`${USER}/forgot-password`, formData);
  return data;
};

/*_____________________________FORGET PASSWORD_______________________________________________ */
export const addProfilePic = async (image, id) => {
  const imgData = new FormData();

  imgData.append("file", image);
  imgData.append("id", `a053ca12-5cea-11ef-b231-cecd0207e311`);

  const { data } = await axiosInstance.post(
    `${USER}/upload-profile-picture`,
    imgData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};
