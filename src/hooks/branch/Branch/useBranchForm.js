import { useFormik } from "formik";

import { useAddBranch, useEditBranch } from "../useBranch";
import { branchSchema } from "./branchSchema";
import { useState } from "react";

export const useBranchForm = ({ onClose, rowData }) => {
  const { mutate: addMutate } = useAddBranch({});
  const { mutate: editMutate } = useEditBranch({});
  const [successFlag, setSuccessFlag] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: rowData?.id || "",
      address: rowData?.address || "",
      phoneNumber: rowData?.phoneNumber || "",
      housingCapacity: rowData?.housingCapacity || "",
    },
    validationSchema: branchSchema,
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
        setSuccessFlag(true);
        onClose();

        setTimeout(() => {
          setSuccessFlag(false);
        }, 1000);
      },
      onError: () => {
        setSuccessFlag(false);
      },
    });
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editMutate(values, {
      onSuccess: () => {
        setSuccessFlag(true);
        onClose();

        setTimeout(() => {
          setSuccessFlag(false);
        }, 1000);
      },
      onError: () => {
        setSuccessFlag(false);
      },
    });
  };

  return {
    formik,
    successFlag,
  };
};
