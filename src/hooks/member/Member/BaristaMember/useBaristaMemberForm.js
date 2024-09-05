import { useFormik } from "formik";

import { useAddBaristaMember, useEditMember } from "../../useMember";

export const useBaristaMemberForm = ({ onClose, rowData }) => {
  const { mutate: addMutate } = useAddBaristaMember({});
  const { mutate: editMutate } = useEditMember({});

  const formik = useFormik({
    initialValues: {
      id: rowData?.id || "",
      fullName: rowData?.user?.fullName || "",
      mobileNumber: rowData?.user?.mobileNumber || "",
      gender: rowData?.user?.gender || "",
      birthDate: rowData?.user?.birthDate || "",
      address: rowData?.user?.address || "",
      email: rowData?.user?.email || "",
      branchId: rowData?.branch?.id || "",
      salary: rowData?.salary || "",
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
