import * as Yup from "yup";

export const userSchema = Yup.object({
    oldPassword: Yup.string().required("Please enter your old password"),
    newPassword: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters long.")
      .matches(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter."
      )
      .matches(/^(?=.*\d)/, "Password must contain at least one digit (number).")
      .matches(
        /^(?=.*[@#$%^&+=])/,
        "Password must contain at least one special character (@, #, $, %, ^, &, +, =,!)."
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required.")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });