import { CHAT } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*________________________GET AI GENERATE_____________________________________*/
export const getChatAIGenerate = async (formData) => {
  const { data } = await axiosInstance.get(
    `${CHAT}/generate?message=${formData?.message}`
  );
  return data?.data;
};

/*________________________GET AI GENERATE ITEM_____________________________________*/
export const getChatAIGenerateItem = async (formData) => {
  const { data } = await axiosInstance.get(
    `${CHAT}/generate-item?description=${formData?.description}`
  );
  return data?.data;
};
