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

/*_____________________________LOCK_USER_______________________________________________ */
export const lockUser = async (formData) => {
  const data = await axiosInstance.post(`${USER}/lock`, formData);
  return data;
};

/*_____________________________UNLOCK_USER_______________________________________________ */
export const unLockUser = async (formData) => {
  const data = await axiosInstance.post(`${USER}/unlock`, formData);
  return data;
};


/*_____________________________FORGET PASSWORD_______________________________________________ */
export const forgotPassword = async (formData) => {
  const data = await axiosInstance.post(`${USER}/forgot-password`, formData);
  return data;
};

/*_____________________________ADD PROFILE PICTURE_______________________________________________ */
export const addProfilePic = async (formData) => {
  const imgData = new FormData();

  imgData.append("file", formData.multipartFile);
  imgData.append("id", formData.id);

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
