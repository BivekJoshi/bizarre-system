import { useFormik } from "formik";

import { useAddBranchOwnerMember } from "../../useMember";

export const useBranchOwnerMemberForm = ({ onClose, rowData }) => {
  const { mutate: addMutate } = useAddBranchOwnerMember({});
  const { mutate: editMutate } = useAddBranchOwnerMember({});

  const formik = useFormik({
    initialValues: {
      id: rowData?.id || "",
      fullName: rowData?.user?.fullName || "",
      mobileNumber: rowData?.user?.mobileNumber || "",
      gender: rowData?.user?.gender || "",
      birthDate: rowData?.user?.birthDate || "",
      address: rowData?.user?.address || "",
      email: rowData?.user?.email || "",
      salary: rowData?.salary || 0,
      branchId: rowData?.branch?.id || "",
    },
    //   validationSchema: sendMoneyRecipientBankSchema,
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
