import { useFormik } from "formik";
import { useAddIdDocument } from "../../useMember";

export const useMemberDocumentForm = ({ onClose, rowData, filterFormik }) => {
  const { mutate } = useAddIdDocument({ onSuccess: onClose });

  const formik = useFormik({
    initialValues: {
      memberId: rowData || "",
      idFrontImage: "",
      idBackImage: "",
    },
    onSubmit: (values) => {
      handleAddDocumentImage(values);
    },
  });

  const handleAddDocumentImage = (values) => {
    const formData = { ...values };
    mutate(formData, {
      onSuccess: () => {
        filterFormik.handleSubmit();
      },
    });
  };

  return {
    formik,
  };
};

export default useMemberDocumentForm;
