import { BRANCH } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*_____________________________POST BRANCH_______________________________________________ */
export const addBranch = async (formData) => {
    const data = await axiosInstance.post(`${BRANCH}/save`, formData);
    return data;
};