import { useFormik } from "formik";
import { useAddOrder, useEditOrder } from "../useOrder";
import { useParams } from "react-router-dom";

export const useOrderForm = ({ remarks = {}, selectedIds = [], onClose }) => {
  const { id } = useParams();

  const initialOrderRequests = Object.entries(remarks).flatMap(
    ([itemId, remarkObj]) =>
      Object.entries(remarkObj).map(([index, remark]) => ({
        itemId,
        remark,
      }))
  );

  const allOrderRequests = [
    ...initialOrderRequests,
    ...selectedIds
      .filter(
        (itemId) =>
          !initialOrderRequests.some((request) => request.itemId === itemId)
      )
      .map((itemId) => ({
        itemId,
        remark: "",
      })),
  ];

  const { mutate: addMutate } = useAddOrder({});
  const { mutate: editMutate } = useEditOrder({});

  const formik = useFormik({
    initialValues: {
      customerTableId: id || "",
      orderRequests: allOrderRequests,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values?.id) {
        handleEditRequest(values);
      } else {
        handleAddRequest(values);
      }
    },
  });

  const handleAddRequest = (values) => {
    values = { ...values };
    addMutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleEditRequest = (values) => {
    values = { ...values };
    editMutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return {
    formik,
  };
};
