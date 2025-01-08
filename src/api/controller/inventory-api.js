import { INVENTORY } from "../api";
import { axiosInstance } from "../axiosInterceptor";

/*________________________GET_____________________________________*/
export const getInventoryFind = async (pageNumber, pageSize) => {
  if (pageNumber && pageSize) {
    const { data } = await axiosInstance.get(
      `${INVENTORY}/find-items?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return data?.data;
  }
};

/*________________________GET_BY_INVENTORY_ID_____________________________________*/
export const getInventoryByItemId = async (itemId) => {
  if (itemId) {
    const { data } = await axiosInstance.get(`${INVENTORY}/add-item/${itemId}`);
    return data;
  }
};

/*____________________________FILTER_INVENTORY_ITEM_______________________________________________ */
export const filterInventoryItem = async (formData) => {
  const { field, value, ...rest } = formData;

  const updatedFormData = {
    ...rest,
    search: [...(formData.search || []), { field, value }],
    pageNumber: formData?.pageNumber,
    noOfRecords: formData?.noOfRecords,
  };

  const data = await axiosInstance.post(
    `${INVENTORY}/find-items`,
    updatedFormData
  );
  return data;
};

/*________________________PATCH_____________________________________*/
export const editStockInventory = async (formData) => {
  const data = await axiosInstance.put(`${INVENTORY}/update-stock`, formData);
  return data;
};
