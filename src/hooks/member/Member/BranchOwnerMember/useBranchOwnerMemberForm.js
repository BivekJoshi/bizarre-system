import { useFormik } from "formik";

import { useAddBranchOwnerMember, useEditMember } from "../../useMember";
import { useState } from "react";

export const useBranchOwnerMemberForm = ({ onClose, rowData }) => {
  const { mutate: addMutate } = useAddBranchOwnerMember({});
  const { mutate: editMutate } = useEditMember({});
  const [successFlag, setSuccessFlag] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: rowData?.id || "",
      fullName: rowData?.user?.fullName || "",
      mobileNumber: "",
      gender: rowData?.user?.gender || "",
      birthDate: rowData?.user?.birthDate || "",
      address: rowData?.user?.address || "",
      email: rowData?.user?.email || "",
      salary: rowData?.salary || 0,
      branchId: "",
    },
    //   validationSchema: sendMoneyRecipientBankSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("🚀 ~ useBranchOwnerMemberForm ~ values:", values)
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
