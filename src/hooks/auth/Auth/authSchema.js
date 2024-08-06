import * as Yup from "yup";

const authSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
});

export { authSchema };
