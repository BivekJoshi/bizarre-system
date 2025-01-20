import * as Yup from "yup";

const branchOwnerMemberSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Full name must be at least 2 characters long")
    .max(50, "Full name cannot exceed 50 characters")
    .required("Branch Owner name is required"),
  
  gender: Yup.string()
    .oneOf(["MALE", "FEMALE", "OTHERS"], "Invalid gender selected")
    .required("Please select gender"),
  
  birthDate: Yup.date()
    .max(new Date(), "Birthdate cannot be in the future")
    .required("Date of birth is required"),
  
  address: Yup.string()
    .min(3, "Address must be at least 3 characters long")
    .max(100, "Address cannot exceed 100 characters")
    .required("Address is required"),
  
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export { branchOwnerMemberSchema };
