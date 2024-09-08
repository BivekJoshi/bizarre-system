import { useFormik } from "formik";
import { useAddPromoCode, useEditPromoCode } from "../usePromoCode";

export const usePromoCodeForm = ({ onClose, rowData }) => {
  const { mutate: addMutate } = useAddPromoCode({});
  const { mutate: editMutate } = useEditPromoCode({});

  const formik = useFormik({
    initialValues: {
      id: rowData?.id || "",
      code: rowData?.code || "",
      userType: rowData?.userType || "",
      discountType: rowData?.discountType || "",
      discountValue: rowData?.discountValue || "",
      effectiveDateTime: rowData?.effectiveDateTime || "",
      terminationDateTime: rowData?.terminationDateTime || "",
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
