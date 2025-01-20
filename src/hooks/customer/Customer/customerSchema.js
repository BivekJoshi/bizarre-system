import * as Yup from "yup";

const customerSchema = Yup.object().shape({
  fullName: Yup.string().required("Customer name is required"),
  mobileNumber: Yup.string()
    .required("Mobile Number is required")
    .matches(
      /^9[0-9]+$/,
      "Mobile number must start with 9 and contain only numeric values"
    )
    .min(10, "Mobile number must be at least 10 digits")
    .max(10, "Mobile number must not exceed 10 digits"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one digit")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ),
  gender: Yup.string().required("Please select gender"),
  birthDate: Yup.string().required("Date of birth is required"),
  address: Yup.string().required("Address is required"),
  email: Yup.string().required("Email is required"),
});

const customerEditSchema = Yup.object().shape({
  fullName: Yup.string().required("Customer name is required"),
  gender: Yup.string().required("Please select gender"),
  birthDate: Yup.string().required("Date of birth is required"),
  address: Yup.string().required("Address is required"),
  email: Yup.string().required("Email is required"),
});

export { customerSchema, customerEditSchema };
