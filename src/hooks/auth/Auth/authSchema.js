import * as Yup from "yup";

const authSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  mobileNumber: Yup.string()
    .required("Mobile Number is required")
    .matches(
      /^9[0-9]+$/,
      "Mobile number must start with 9 and contain only numeric values"
    )
    .min(10, "Mobile number must be at least 10 digits")
    .max(10, "Mobile number must not exceed 10 digits"),
});

export { authSchema };
