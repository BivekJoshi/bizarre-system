import { useFormik } from "formik";
import { useAddSetting } from "../useSetting";
import * as Yup from "yup";

const settingSchema = Yup.object().shape({
  value: Yup.string().required("Value is required"),
});

export const useSettingForm = ({ onClose, rowData }) => {
  const { mutate: addMutate } = useAddSetting({});
  const { mutate: editMutate } = useAddSetting({});

  const formik = useFormik({
    initialValues: {
      // setting: rowData?.setting || "",
      value: rowData?.value || "",
      id: rowData?.id,
    },
    validationSchema: settingSchema,
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
