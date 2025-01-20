import * as Yup from "yup";

const promoCodeSchema = Yup.object().shape({
  code: Yup.string()
    .required("Promo code is required")
    .matches(/^[A-Za-z0-9]+$/, "Promo code must be alphanumeric"),

  userType: Yup.string().required("User type is required"),

  discountType: Yup.string().required("Discount type is required"),

  discountValue: Yup.number().required("Discount value is required"),
  // .positive("Discount value must be a positive number")
  // .when("discountType", {
  //   is: "PERCENTAGE",
  //   then: Yup.number().max(100, "Percentage discount cannot exceed 100%"),
  // }),

  effectiveDateTime: Yup.date().required(
    "Effective date and time are required"
  ),

  terminationDateTime: Yup.date().required(
    "Termination date and time are required"
  ),
});

export { promoCodeSchema };
