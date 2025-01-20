import * as Yup from "yup";

const customerTableSchema = Yup.object().shape({
  tableNumber: Yup.string()
    .min(2, "Customer Table must be at least 2 characters long")
    .max(50, "Customer Table cannot exceed 50 characters")
    .required("Customer Table name is required"),
});

export { customerTableSchema };
