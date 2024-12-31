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
  const data = await axiosInstance.post(
    `${MEMBER}/branch-owner/save`,
    formData
  );
  return data;
};

/*_____________________________POST MEMBER BARISTA_______________________________________________ */
export const addBaristaMember = async (formData) => {
  const data = await axiosInstance.post(`${MEMBER}/barista/save`, formData);
  return data;
};

/*________________________GET_____________________________________*/
export const getMember = async (pageNumber, pageSize) => {
  if (pageNumber && pageSize) {
    const { data } = await axiosInstance.get(
      `${MEMBER}/find?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return data?.data;
  }
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

/*_____________________________ADD DOCUMENT_______________________________________________ */
export const addIdDocument = async (formData) => {
  const imgData = new FormData();

  imgData.append("memberId", formData.memberId);
  imgData.append("idFrontImage", formData.idFrontImage[0]);
  imgData.append("idBackImage", formData.idBackImage[0]);

  const { data } = await axiosInstance.post(
    `${MEMBER}/upload-id-image`,
    imgData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

/*____________________________FILTER_MEMBER_______________________________________________ */
export const filterMember = async (formData) => {
  const { field, value, ...rest } = formData;

  const updatedFormData = {
    ...rest,
    search: [...(formData.search || []), { field, value }],
    pageNumber: formData?.pageNumber,
    noOfRecords: formData?.noOfRecords,
  };

  const data = await axiosInstance.post(`${MEMBER}/find`, updatedFormData);
  return data;
};
