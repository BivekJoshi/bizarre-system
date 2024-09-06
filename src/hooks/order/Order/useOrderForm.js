import { useFormik } from "formik";
import { useAddOrder, useEditOrder } from "../useOrder";
import { useParams } from "react-router-dom";

export const useOrderForm = ({ remarks = {}, selectedIds = [] }) => {
  const id = useParams();
  console.log("🚀 ~ useOrderForm ~ id:", id);
  const initialOrderRequests = Object.entries(remarks).map(
    ([itemId, remark]) => ({
      itemId,
      remark,
    })
  );

  const allOrderRequests = [
    ...initialOrderRequests,
    ...selectedIds
      .filter(
        (id) => !initialOrderRequests.some((request) => request.itemId === id)
      )
      .map((id) => ({ itemId: id, remark: "" })),
  ];

  const { mutate: addMutate } = useAddOrder({});
  const { mutate: editMutate } = useEditOrder({});

  const formik = useFormik({
    initialValues: {
      customerTableId: id?.id || "",
      orderRequests: allOrderRequests,
    },
    // validationSchema: branchSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values?.id) {
        handledEditRequest(values);
      } else {
        handledAddRequest(values);
      }
    },
  });

  const handledAddRequest = (values) => {
    values = { ...values };
    addMutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handledEditRequest = (values) => {
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
