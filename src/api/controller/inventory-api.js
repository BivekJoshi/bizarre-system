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

/*________________________SAVE_INVENTORY_____________________________________*/
// POST /inventory/save with body {itemId, stockQuantity, reorderLevel,
// maxStockLevel, leadTimeDays}. Replaces the legacy GET /add-item/{itemId}.
export const addInventoryByItemId = async (formData) => {
  const payload = {
    itemId: formData?.itemId,
    stockQuantity: Number(formData?.stockQuantity) || 0,
    reorderLevel: Number(formData?.reorderLevel) || 0,
    maxStockLevel: Number(formData?.maxStockLevel) || 0,
    leadTimeDays: Number(formData?.leadTimeDays) || 0,
  };
  const data = await axiosInstance.post(`${INVENTORY}/save`, payload);
  return data;
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


/*________________________DELETE_____________________________________*/
export const deleteStockInventory = async (id) => {
  const data = await axiosInstance.get(`${INVENTORY}/delete-item/${id}`);
  return data;
};