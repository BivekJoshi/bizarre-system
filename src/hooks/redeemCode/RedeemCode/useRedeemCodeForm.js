import { useFormik } from "formik";
import { useAddRedeemCode, useEditRedeemCode } from "../useRedeemCode";

export const useRedeemCodeForm = ({ onClose, rowData }) => {
  const { mutate: addMutate } = useAddRedeemCode({});
  const { mutate: editMutate } = useEditRedeemCode({});

  const formik = useFormik({
    initialValues: {
      id: rowData?.id || "",
      code: rowData?.code || "",
      league: rowData?.league || "",
      redeemableCoins: rowData?.redeemableCoins || "",
      effectiveDateTime: rowData?.effectiveDateTime
        ? rowData.effectiveDateTime.replace("T", " ")
        : "",
      terminationDateTime: rowData?.terminationDateTime
        ? rowData.terminationDateTime.replace("T", " ")
        : "",
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
