import * as Yup from "yup";

const authSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  mobileNumber: Yup.string().required("Mobile Number is required"),
});

export { authSchema };
