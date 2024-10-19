import { ITEM } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*________________________GET_____________________________________*/
export const getItem = async (pageNumber, pageSize) => {
  if (pageNumber && pageSize) {
    const { data } = await axiosInstance.get(
      `${ITEM}/find?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return data?.data;
  }
};

/*________________________GET_BY_ID_____________________________________*/
export const getItemById = async (id) => {
  if (id) {
    const { data } = await axiosInstance.get(`${ITEM}/${id}`);
    return data;
  }
};

/*________________________PATCH_____________________________________*/
export const editItem = async (formData) => {
  const data = await axiosInstance.put(`${ITEM}/save`, formData);
  return data;
};

/*_____________________________POST_______________________________________________ */
export const addItem = async (formData) => {
  const data = await axiosInstance.post(`${ITEM}/save`, formData);
  return data;
};

/*____________________________FILTER_ITEM_______________________________________________ */
export const filterItem = async (formData) => {
  const { field, value, ...rest } = formData;

  const updatedFormData = {
    ...rest,
    search: [...(formData.search || []), { field, value }],
    pageNumber: formData?.pageNumber,
    noOfRecords: formData?.noOfRecords,
    // pageable: {
    //   paged: true,
    //   pageNumber: formData?.pageable?.pageNumber,
    //   pageSize: formData?.pageable?.pageSize,
    //   offset: formData?.pageable?.pageNumber * formData?.pageable?.pageSize,
    // },
  };

  const data = await axiosInstance.post(`${ITEM}/find`, updatedFormData);
  return data;
};

/*_____________________________POST CHANGE STATUS______________________________________________ */
export const addItemChangeStatus = async (formData) => {
  const data = await axiosInstance.post(`${ITEM}/change-status`, formData);
  return data;
};

/*_____________________________UPLOAD ITEM IMAGAGE______________________________________________ */
export const addUploadItemImage = async (formData) => {
  const imgData = new FormData();

  imgData.append("file", formData.multipartFile);
  imgData.append("id", formData?.id);

  const { data } = await axiosInstance.post(`${ITEM}/upload-image`, imgData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
