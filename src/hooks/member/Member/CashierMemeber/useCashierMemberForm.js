import { useFormik } from "formik";

import { useAddCashierMember } from "../../useMember";

export const useCashierMemberForm = ({ onClose, data }) => {
  const { mutate: addMutate } = useAddCashierMember({});
  const { mutate: editMutate } = useAddCashierMember({});

  const formik = useFormik({
    initialValues: {
      id: data?.id || "",
      fullName: data?.fullName || "",
      mobileNumber: data?.mobileNumber || "",
      gender: data?.gender || "",
      birthDate: data?.birthDate || "",
      address: data?.address || "",
      email: data?.email || "",
      branchId: data?.branchId || "",
      salary: data?.salary || "",
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
