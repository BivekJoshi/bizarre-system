import { useFormik } from "formik";

import { useAddCustomerByOnBoard } from "../../useCustomer";
import * as Yup from "yup";

const onBoardSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Customer name is required")
    .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed")
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be less than 50 characters"),

  mobileNumber: Yup.string()
    .required("Mobile Number is required")
    .matches(
      /^9[0-9]+$/,
      "Mobile number must start with 9 and contain only numeric values"
    )
    .min(10, "Mobile number must be at least 10 digits")
    .max(10, "Mobile number must not exceed 10 digits"),
});

export const useCustomerOnBoardForm = ({ onClose }) => {
  const { mutate: addMutate } = useAddCustomerByOnBoard({});

  const formik = useFormik({
    initialValues: {
      id: "",
      fullName: "",
      mobileNumber: "",
    },
    validationSchema: onBoardSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handledAddRequest(values);
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

  return {
    formik,
  };
};
