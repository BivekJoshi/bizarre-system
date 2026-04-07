import * as Yup from "yup";

const itemSchema = Yup.object({
  id: Yup.string().optional(),
  name: Yup.string().required("Name is required"),
  costPrice: Yup.number()
    .required("Cost Price is required")
    .positive("Cost Price must be positive"),
  markedPrice: Yup.number()
    .required("Marked Price is required")
    .positive("Marked Price must be positive"),
  sellingPrice: Yup.number()
    .required("Selling Price is required")
    .positive("Selling Price must be positive"),
  description: Yup.string().optional(),
  type: Yup.string().required("Type is required"),
  stockCount: Yup.number()
    // .required("Stock Count is required")
    .integer("Stock Count must be an integer")
    .min(0, "Stock Count cannot be negative"),
  tags: Yup.string().optional(),
  color: Yup.string().optional(),
});

export { itemSchema };
