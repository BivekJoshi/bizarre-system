import { useFormik } from "formik";
import { useAddSetting } from "../useSetting";

export const useSettingForm = ({ onClose, data }) => {
  const { mutate: addMutate } = useAddSetting({});
  const { mutate: editMutate } = useAddSetting({});

  const formik = useFormik({
    initialValues: {
      setting: "",
      value: "",
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
